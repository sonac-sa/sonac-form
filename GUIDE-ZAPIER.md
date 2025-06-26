# Guide de Configuration Zapier - Formulaire SONAC

## 🎯 Objectif
Remplacer GetForm par une intégration directe avec Zapier pour éviter les limites de formulaires.

## 📋 Étapes de configuration

### 1. Création du webhook Zapier

#### A. Connexion à Zapier
1. Allez sur https://zapier.com
2. Connectez-vous à votre compte
3. Cliquez sur "Create Zap"

#### B. Configuration du Trigger
1. **App & Event** : Choisissez "Webhooks by Zapier"
2. **Event** : Sélectionnez "Catch Hook"
3. **Test** : Zapier vous donnera une URL webhook unique
4. **Copiez cette URL** (exemple: https://hooks.zapier.com/hooks/catch/123456/abcdef/)

### 2. Configuration de l'Action

#### Option A : Envoi par Email
1. **App & Event** : Choisissez "Email by Zapier"
2. **Event** : "Send Outbound Email"
3. **Configuration** :
   - **To** : votre email de réception
   - **Subject** : "Nouveau formulaire SONAC BIA - {{nomAssure}}"
   - **Body** : Utilisez les champs du formulaire

#### Option B : Google Sheets
1. **App & Event** : Choisissez "Google Sheets"
2. **Event** : "Create Spreadsheet Row"
3. **Configuration** :
   - Sélectionnez votre feuille de calcul
   - Mappez les champs du formulaire aux colonnes

#### Option C : Gmail
1. **App & Event** : Choisissez "Gmail"
2. **Event** : "Send Email"
3. **Configuration** similaire à l'option Email

### 3. Configuration du formulaire

#### A. Modification du fichier zapier-config.js
```javascript
const ZAPIER_CONFIG = {
  // Remplacez par votre URL webhook Zapier
  WEBHOOK_URL: 'https://hooks.zapier.com/hooks/catch/VOTRE_ID/VOTRE_HOOK/',
  
  // Reste de la configuration...
};
```

#### B. Test de la configuration
1. Ouvrez votre formulaire
2. Remplissez quelques champs de test
3. Soumettez le formulaire
4. Vérifiez que Zapier reçoit les données

### 4. Déploiement sur Firebase

```bash
# Dans le dossier sonac-form-zapier
firebase deploy
```

## 🔧 Champs disponibles dans Zapier

Votre webhook recevra tous ces champs :

### Informations de l'Assuré
- `nomAssure` : Nom/Raison Sociale
- `adresseAssure` : Adresse
- `contactAssure` : Contact (Téléphone/Email)

### Identification de l'Acheteur
- `nomAcheteur` : Nom/Raison Sociale
- `formeJuridique` : Forme Juridique
- `adresseAcheteur` : Adresse
- `registreCommerce` : N° Registre du Commerce et NINEA
- `secteurActivite` : Secteur d'Activité

### Opération à Couvrir
- `typeOperation` : Type d'Opération
- `descriptionOperation` : Description Sommaire
- `montantOperation` : Montant de l'Opération
- `conditionsPaiement` : Conditions de Paiement
- `dateOperation` : Date Prévue de l'Opération

### Éléments Financiers (3 dernières années)
- `chiffreAffairesN1`, `chiffreAffairesN2`, `chiffreAffairesN3`
- `resultatNetN1`, `resultatNetN2`, `resultatNetN3`
- `capitauxPropresN1`, `capitauxPropresN2`, `capitauxPropresN3`
- `actifsCirculantsN1`, `actifsCirculantsN2`, `actifsCirculantsN3`
- `passifsCirculantsN1`, `passifsCirculantsN2`, `passifsCirculantsN3`
- `totalEndettementN1`, `totalEndettementN2`, `totalEndettementN3`
- `cafcafgN1`, `cafcafgN2`, `cafcafgN3`
- `commentairesFinanciers` : Commentaires

### Incidents de Paiement
- `historiqueIncidents` : Historique d'Incidents avec l'Assuré (BIA)
- `incidentsNotoires` : Incidents Notoires (autres)

### Certification et Signature
- `dateCertification` : Date
- `prenomNom` : Prénom et Nom
- `fonction` : Fonction
- `signature` : Données de signature électronique

### Métadonnées automatiques
- `timestamp` : Date/heure de soumission
- `source` : "Formulaire SONAC BIA"
- `version` : "2.0"
- `integration` : "Zapier Direct"
- `url` : URL du formulaire
- `g-recaptcha-response` : Token reCAPTCHA

## 🚀 Avantages de cette solution

✅ **Pas de limite de formulaires** (contrairement à GetForm)
✅ **Intégration directe** avec vos outils existants
✅ **Données structurées** en JSON
✅ **Métadonnées enrichies** automatiquement
✅ **Gestion d'erreur** améliorée
✅ **Configuration centralisée** facile à modifier

## 🔍 Dépannage

### Erreur "Configuration Zapier manquante"
- Vérifiez que `zapier-config.js` est bien chargé
- Assurez-vous d'avoir remplacé `VOTRE_ID_ZAPIER`

### Formulaire ne s'envoie pas
- Vérifiez l'URL webhook dans la console Zapier
- Testez l'URL webhook directement
- Vérifiez la console du navigateur pour les erreurs

### Données manquantes dans Zapier
- Tous les champs du formulaire sont envoyés automatiquement
- Vérifiez le mapping dans votre Zap

## 📞 Support
- Documentation Zapier : https://zapier.com/help
- Test webhook : https://webhook.site (pour déboguer)


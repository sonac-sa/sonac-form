# Formulaire SONAC - Version Google Apps Script

## 🎯 Description
Version modifiée du formulaire SONAC BIA avec intégration directe Google Apps Script (remplace Zapier).

## 📁 Contenu du package

- `index.html` - Formulaire principal (identique visuellement)
- `google-apps-script-config.js` - Configuration du script Google Apps Script
- `firebase.json` - Configuration Firebase Hosting
- `.firebaserc` - Projet Firebase
- `GUIDE-GOOGLE-APPS-SCRIPT.md` - Guide détaillé de configuration
- `deploy.sh` / `deploy.bat` - Scripts de déploiement

## 🚀 Installation rapide

### 1. Configuration Google Apps Script
```bash
# Éditez google-apps-script-config.js
# Remplacez VOTRE_URL_GOOGLE_APPS_SCRIPT par votre URL de script réelle
```

### 2. Déploiement Firebase
```bash
# Linux/Mac
./deploy.sh

# Windows
deploy.bat
```

## ✅ Avantages vs Zapier

| Fonctionnalité | Zapier | Google Apps Script |
|----------------|---------|---------------|
| Coût | Peut nécessiter un abonnement payant pour des tâches complexes ou un volume élevé | Gratuit dans les limites de l'utilisation de Google | 
| Intégrations | 5000+ applications | Principalement l'écosystème Google (Sheets, Docs, Drive, etc.) | 
| Flexibilité | Basée sur des déclencheurs et des actions prédéfinis | Programmation complète avec JavaScript, offrant une flexibilité maximale | 
| Hébergement | Géré par Zapier | Géré par Google | 
| Données structurées | JSON complet | JSON complet | 
| Gestion d'erreur | Avancée | Personnalisable via le code | 

## 🔧 Configuration requise

1. **Compte Google**
2. **Firebase CLI** installé
3. **Projet Firebase** existant (`sonac-form`)
4. **Script Google Apps Script** déployé en tant qu'application web.

## 📋 Checklist de migration

- [ ] Créer et déployer le script Google Apps Script
- [ ] Configurer `google-apps-script-config.js`
- [ ] Tester en local
- [ ] Déployer sur Firebase
- [ ] Vérifier réception des données

## 🆘 Support

- Voir `GUIDE-GOOGLE-APPS-SCRIPT.md` pour la configuration détaillée
- Console Firebase : https://console.firebase.google.com/project/sonac-form
- Google Apps Script : https://script.google.com

## 📝 Notes importantes

⚠️ **Le contenu du formulaire est identique** - seule l'intégration technique change
✅ **Toutes les fonctionnalités conservées** : PDF, signature, reCAPTCHA
🔄 **Migration transparente** pour les utilisateurs finaux

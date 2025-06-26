# Formulaire SONAC - Version Zapier

## 🎯 Description
Version modifiée du formulaire SONAC BIA avec intégration directe Zapier (remplace GetForm).

## 📁 Contenu du package

- `index.html` - Formulaire principal (identique visuellement)
- `zapier-config.js` - Configuration des webhooks Zapier
- `firebase.json` - Configuration Firebase Hosting
- `.firebaserc` - Projet Firebase
- `GUIDE-ZAPIER.md` - Guide détaillé de configuration
- `deploy.sh` / `deploy.bat` - Scripts de déploiement

## 🚀 Installation rapide

### 1. Configuration Zapier
```bash
# Éditez zapier-config.js
# Remplacez VOTRE_ID_ZAPIER par votre webhook réel
```

### 2. Déploiement Firebase
```bash
# Linux/Mac
./deploy.sh

# Windows
deploy.bat
```

## ✅ Avantages vs GetForm

| Fonctionnalité | GetForm | Zapier Direct |
|----------------|---------|---------------|
| Limite formulaires | 25/mois | Illimité |
| Intégrations | Limitées | 5000+ apps |
| Données structurées | Basique | JSON complet |
| Gestion d'erreur | Basique | Avancée |
| Configuration | Fixe | Flexible |

## 🔧 Configuration requise

1. **Compte Zapier** (gratuit ou payant)
2. **Firebase CLI** installé
3. **Projet Firebase** existant (`sonac-form`)

## 📋 Checklist de migration

- [ ] Créer webhook Zapier
- [ ] Configurer `zapier-config.js`
- [ ] Tester en local
- [ ] Déployer sur Firebase
- [ ] Vérifier réception des données

## 🆘 Support

- Voir `GUIDE-ZAPIER.md` pour la configuration détaillée
- Console Firebase : https://console.firebase.google.com/project/sonac-form
- Dashboard Zapier : https://zapier.com/app/dashboard

## 📝 Notes importantes

⚠️ **Le contenu du formulaire est identique** - seule l'intégration technique change
✅ **Toutes les fonctionnalités conservées** : PDF, signature, reCAPTCHA
🔄 **Migration transparente** pour les utilisateurs finaux


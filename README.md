@@ .. @@
 # Site de Formation en Mécanique Automobile
 
+## 🚀 Déploiement sur Netlify
+
+### Méthode 1 : Déploiement automatique via Git
+
+1. **Créer un repository GitHub**
+   ```bash
+   git init
+   git add .
+   git commit -m "Initial commit - MécaFormation platform"
+   git branch -M main
+   git remote add origin https://github.com/votre-username/mecaformation.git
+   git push -u origin main
+   ```
+
+2. **Connecter à Netlify**
+   - Aller sur [netlify.com](https://netlify.com)
+   - Cliquer "New site from Git"
+   - Connecter votre repository GitHub
+   - Configuration automatique détectée via `netlify.toml`
+
+### Méthode 2 : Déploiement manuel
+
+1. **Build du projet**
+   ```bash
+   npm run build
+   ```
+
+2. **Déployer le dossier dist**
+   - Aller sur [netlify.com](https://netlify.com)
+   - Glisser-déposer le dossier `dist` sur Netlify
+   - Votre site sera en ligne immédiatement !
+
+### Configuration automatique
+
+Le fichier `netlify.toml` configure automatiquement :
+- ✅ **Build command** : `npm run build`
+- ✅ **Publish directory** : `dist`
+- ✅ **Redirections SPA** : Toutes les routes vers `index.html`
+- ✅ **Cache optimisé** : Assets statiques
+- ✅ **Headers sécurité** : Protection XSS, CSRF
+
+### Domaine personnalisé
+
+Une fois déployé, vous pouvez :
+- Utiliser le domaine Netlify gratuit : `votre-site.netlify.app`
+- Configurer votre domaine : `mecaformation.fr`
+- Certificat SSL automatique
+
 ## React + TypeScript + Vite
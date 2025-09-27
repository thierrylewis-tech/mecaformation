#!/bin/bash
# Script de déploiement automatisé pour Hostinger

set -e  # Exit on any error

echo "🚀 Déploiement MécaFormation sur Hostinger"
echo "=========================================="

# Variables de configuration
DOMAIN="mecaformation.fr"
BUILD_DIR="dist"
BACKUP_DIR="backup-$(date +%Y%m%d-%H%M%S)"

# Vérification des prérequis
echo "📋 Vérification des prérequis..."

if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé"
    exit 1
fi

if [ ! -f ".env" ]; then
    echo "⚠️  Attention: Fichier .env non trouvé"
    echo "Assurez-vous d'avoir configuré vos variables d'environnement"
fi

# Nettoyage des anciens builds
echo "🧹 Nettoyage..."
rm -rf $BUILD_DIR
rm -rf node_modules/.cache

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm ci --production=false

# Build de production optimisé
echo "🔨 Build de production..."
npm run build

# Vérification du build
if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Erreur: Build échoué - dossier $BUILD_DIR non créé"
    exit 1
fi

echo "✅ Build réussi !"
echo "📊 Taille du build:"
du -sh $BUILD_DIR

# Optimisations post-build
echo "⚡ Optimisations..."

# Copie du fichier .htaccess
cp .htaccess $BUILD_DIR/

# Création du fichier robots.txt optimisé
cat > $BUILD_DIR/robots.txt << EOF
User-agent: *
Allow: /

# Sitemap
Sitemap: https://$DOMAIN/sitemap.xml

# Pages importantes
Allow: /formations
Allow: /programme
Allow: /abonnements
Allow: /ressources
Allow: /contact

# Crawl delay
Crawl-delay: 1
EOF

# Optimisation des images (si imagemagick installé)
if command -v convert &> /dev/null; then
    echo "🖼️  Optimisation des images..."
    find $BUILD_DIR -name "*.png" -exec convert {} -quality 85 {} \;
    find $BUILD_DIR -name "*.jpg" -exec convert {} -quality 85 {} \;
fi

# Création du package de déploiement
echo "📦 Création du package de déploiement..."
cd $BUILD_DIR
zip -r ../mecaformation-deploy.zip . -x "*.map" "*.md"
cd ..

echo ""
echo "🎉 Build prêt pour déploiement !"
echo "📁 Fichiers à uploader: $BUILD_DIR/"
echo "📦 Archive: mecaformation-deploy.zip"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Connectez-vous à hPanel Hostinger"
echo "2. Allez dans 'Gestionnaire de fichiers'"
echo "3. Supprimez le contenu de public_html"
echo "4. Uploadez le contenu de $BUILD_DIR/"
echo "5. Configurez le domaine $DOMAIN"
echo ""
echo "🌐 Votre site sera accessible sur: https://$DOMAIN"
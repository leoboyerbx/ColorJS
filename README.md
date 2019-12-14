# ColorJS

# Accueil

ColorJS est une librairie JS que vous pouvez utiliser pour créer des diaporamas animés, simplement en tapant du HTML et du CSS. La librairie se charge d'accélérer le processus de création.

### Avantages et inconvénients de cette solution

| Avantages | Inconvénients |
| :--- | :--- |
| Fonctionne sur n'importe quel navigateur | Nécessité de savoir coder pour créer des diaporamas |
| Open-source et très simple | Moins complet que des solutions comme slides.com |
| Quasiment sans limites \(vous pouvez étendre ses fonctionnalités si vous savez utiliser javascript\) |  |
| Synchronisation temps-réel entre 2 appareils facilitée |  |
| Vous pouvez publier votre diaporama comme un site web |  |

* **slide**: Une diapositive

### Comment ça fonctionne

ColorJS se charge d'importer les styles nécessaires pour la mise en page du diaporama. Ensuite il fait correspondre des actions clavier à des ajouts/suppressions de classes CSS pour faire progresser l'animation.

Chaque slide est un élément `div` avec la classe `cjs-slide`. Le script ajoute la classe `current` à la slide en cours, et les transition et animations sont définies en CSS \(par vous-même ou avec les propriétés livrées par défaut\).

Pour laisser un maximum de flexibilité, le script ajout la classe `current` à la slide en cours et la classe `prev`à toutes les slides déjà passées. Ainsi vous pouvez choisir sur quelles propriétés CSS les changements s'appliquent.

Si vous voulez qu'un élément apparaisse seulement à un moment précis, vous pouvez lui ajouter l'attribut `cjs-animate`

### Exemple de fichier diaporama

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Titre de mon diaporama</title>
    
    <script defer src="path/to/colorjs.bundle.js"></script>
</head>
<body>
    <div id="cjs-slider">
        <div class="cjs-slide" style="background-color: #f00">
            Ma première slide
        </div>
        <div class="cjs-slide" style="background-color: #8e44ad">
            Ma deuxième slide
        </div>
    </div>

</body>
</html>
```

Assez simple non ?

Pour en savoir plus, consultez [la documentation pas-à-pas](https://docs.colorjs.cc).

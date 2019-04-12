# ColorJS

Une simple librairie pour créer des diaporamas en HTML/CSS

ColorJS est une librairie JS que vous pouvez utiliser pour créer des diaporamas animés, simplement en tapant du HTML et du CSS. La librairie se charge d'accélérer le processus de création.

> Merci de noter que le projet en est à ses balbutiements et que je ne suis pas un professionnel (je suis étudiant). Il reste donc des erreurs et de nombreuses fonctions sont manquantes.
> 
> Cependant la librairie est déjà utilisable et fonctionne pour un usage simple !  Je l'ai utilisée pour tous mes diaporamas nécessaires à certaines épreuves du Bac.

## Comment ça fonctionne

ColorJS se charge d'importer les styles nécessaires pour la mise en page du diaporama. Ensuite il fait correspondre des actions clavier à des ajouts/suppressions de classes pour faire progresser l'animation.

>  Whaaat ? J'ai pas compris...

Par exemple, si vous avez simplement 3 `div`avec la classe `cjs-slide` (des diapositives colorJS, donc) dans votre document HTML, le script va ajouter chacun de ces divs à la liste des éléments animés et va les animer dans l'ordre où ils apparaissent dans le code.

Pour laisser un maximum de flexibilité, le script ajout la classe `current` à la slide en cours et la classe `prev`à toutes les slides déjà passées. Ainsi vous pouvez choisir sur quelles propriétés CSS les changements s'appliquent.

Si vous voulez qu'un élément apparaisse seulement à un moment précis, vous pouvez lui ajouter l'attribut `cjs-animate`

## Comment utiliser ColorJS

Tout est détaillé sur [la documentation](https://colorjs.readthedocs.io/fr/latest/)

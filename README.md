# functional et son framework
une librairie de programmation fonctionelle JavaScript (et son framework)

//-- todo: écrire un read me crédible, finir la page de présentation(à partir du vieux xml qui traîne quelque part)

/**
-----------------------------------------------------------------------------------------------------------------
* Description des fichiers notables:
-----------------------------------------------------------------------------------------------------------------
**  FUNCTIONAL
* functional.1.2.3.js version stable de functional (tronc)
* functionals.js version en cours de développement de functional.X.js
* functional.head.js gestion du contenu de head(dont interface de style de la page)
* functional.instructions.js création de fonctions anonymes nommées e contexte d'exécution

** FRAMEWORK
* loopexe.js boucle d'exécution comparable à un thread utilisant requestAnimationFrame
* datacollection.js modèle de données comprenant un générateur (factory pattern)
* domtree.1.js un DOM virtuel comportant vue et données, des fonctions de mises à jour du dom

AUTRES
* canvasmachine.1.js interface de dessin CANVASRenderer2D
* dom2d.js une alternative à canvas de dessin 2D utilisant des éléments DOM pour simuler (dev non aboutit)
-----------------------------------------------------------------------------------------------------------------

PREVUS PLUS TARD OU EN COURS
* des générateurs d'items spécifiques au framework (factory pattern) 
* des presets graphiques utilisant CSS, SVG, ASCII pour générer des objets graphiques (i.e.: functional.graphickit.js )
* plusieurs interfaces utilisateur dans plusieurs contextes(menus de dialogue, interactivité canvas...) voir functional.modal.js, functional.form.js, functional.canvasIHM.js
* des API et widget à la pelle
* une interface graphique de développement en HTML
-----------------------------------------------------------------------------------------------------------------
ET bien d'autres bonnes et belles choses!!!
*/
(functional.JS is using functional programming in a JavaScript context).
functional.js est une librairie (en groupe de fichiers) s'appuyant au max sur la programmation fonctionnelle et uniquement axé en JavaScript.

##framework un framework complétement objet en cours de développement (aucun nom définit à ce jour) le complétera et s'appuiera dessus.

##additionals.js est un fichier de fonctions annexes spécifique à l'utilisation du framework, ne rentrant pas dans le cadre objet ni ne pouvant être affilié à un module du tronc commun de functional.XX.js


Le but premier de functional.js (à part me faire un peu la main) est de me fournir des routines globales. Bien que d'autres librairies/bibliothéques existe j'ai essayé d'y apporter plusieurs avantages.

_la programmation fonctionnelle se base peu sur les modèles/pattern de programmation OOP/POO. Bien qu'en JavaScript le terme fonction et objet soit très peu différent(mais cela évolue depuis ecmascript6 et < nottament avec l'utilisation du mot clé class) ici c'est le chaînage des fonctions renvoyant toujours une valeur primaire traitée ou résultante des paramètres/arguments de la fonction utilisée.

_L'écriture vise à s'approcher d'une lecture intuitive plus proche du langage humain que la logique mathématique et informatique. Il peut donc être plus accessible que certaines autres bibliothéques pour les développeurs tout en gardant une limpidité de lecture sans noms et mots à rallonge(à noter qu'une future version minifiée devra être adaptée pour tenir compte de la minification). NOTE: Des versions raccourcies des fonctions existent pour un grand nombre d'entre elles ou certaines pour faciliter la frappe sont des clones. Exemple sayLog(arg) et saylog(arg) sont identiques. Ceci vise à faciliter l'écriture du code et éviter les erreurs de casse.

_création de simili-threads: le fichier functional.instructions.js comporte des tableaux(Array) comprenant un nom, une fonction anonyme crée par le développeur, une liste d'argument (optionels) et les fonctions permettant leur 

_L'ensemble des fichiers .js vise à être modulaire à partir d'un tronc commun functional.XX.js (XX indiquant le numéro de version en cours) auquel les différents modules spécifiques et spécialisées peuvent être incorporés. Certains modules requiérent néanmoins en plus du tronc commun des modules mères, cela est systèmatiquement indiqué dans le début de chaque fichier lorsque c'estle cas. Exemple: le fichier functional.head.js qui apporte entre autres une gestion des styles dans le head d'un document HTML est nécessaire pour functional.modal.js comportant des fenêtres modales. Ce fonctionnement modulaire vise à permettre une meilleure optimisation des ressources en limitant le nombres de lignes de codes inutilisées à charger tout en permettant de pouvoir éventuellement rajouter les modules omis ou de nouveaux modules qui ont été crées.

_Bien qu'actuellement utilisé en contexte global il est possible de traiter les scripts utilisant functional.js en tant qu'items objets. Cela permet de moduler la sécurité des scripts selon les besoins en utilisant un adapteur qui les contiendra. Bien que non actuellement développé et testé cela implique que les fonctions sont/seront compatibles avec les autres framework les plus répandus comme JQuery.

_Rapidité encore: L'une de mes motivations au développement étant l'animation

_Polyfils et rétro-adaptation: Plusieurs fonctions utilisant ECMASCRIPT6> et HTML5 contiennent des fonctions tests et leur adaptation des nouvelles fonctionnalités aux anciennes version de JavaScript comme au différents envirronnements d'exploitation du code, aussi bien logicielle(navigateur) que matériel(web reponsive scripting). NOTE: certains polyfils sont des captations de fonctions existantes et sous licence libre, dans ce cas l'auteur est cité. Si ce n'est pas le cas merci de nous prévenir afin que nous rectifions l'oubli.

IMPORTANT:
0) Présence d'objets: Les objets sont évidemment présent. Ainsi on peut noter l'ajout de méthodes pour les Objets Array dans le tronc commun(utilisant l'héritage par prototype bien que j'y ai eu le moins recours possible), éventuellement leur équivalent purement fonctionel ou même des fonctions plus avancées(ex: last(anyArray) équivaut à anyArray[anyArray.length-1] en incluant une vérification que anyArray est bien de type Array (voir fonction isArray(anyArray) ). Dans certains cas les objets doivent être instancié dans des variables afin de les réutiliser plus tard. Ce fonctionnement étant contraire au principe de la programmation fonctionnelle ( favorisant le chaînage et n'utilisant ainsi que la TemporalDeadZone des variables traitées = rapidité accrue du traitement ) il est assez rare dans le tronc commun.

0a) Notez La présence de certaines variables globales à des fins de configuration et/ou contrôle. Ces variables ne sont pas sécurisées et sont plus des variables pratiques qui le seront dans le cadre du déploiement final du framework.

1) certaines distinctions objets de JS sont volontairement ignorées, nottament les niveaux BOM et DOM 1,2,3. Cela toujours dans un soucis de simplification. Toutefois la séparation logique des fonctions ou groupes de fonctions du tronc commun reste établie et les groupes de fonctions y sont regroupés par thématique. Le chaînage de fonctions et les fonctions proches requiérant les unes aux autres en programmation fonctionnelle étant important ces groupements se sont fait naturellement. 
Exemple: newTag(tagname) et newTagId(tagname,id)

NOTE:
(tronc commun) 
_date début de développemment: début de l'année 2017, les versions 0 comme 1.0(première version fonctionnelle) jusqu'à la version 1.2.2 ne sont pas présentes sur ce gitHub mais archivées sur mon ordinateur.
_version:  actuelle  v: 1.2.3 Le fichier servant au développement est nommé functionals.js tandis que la version archive stable se nomme funcitonal.1.2.3.js Ces fichiers sont lépuration et la correction de la version 1.2.2.

(anciens fichiers abandonnées)
_animation.js, loop.js , looper.js , runanimation.js sont abandonnées. Dédiés à l'animation par setInterval/requestAnimationFrame bien que d'une approche intéressante. Les fichiers servants au framework les remplaçants (favorisant cette fois requestAnimationFrame) est loopexe.js , il recquiert functional.instructions.js

_18/09/18 AJOUT de fichiers notyetused.functional.MODULENAME.js le préfixe notyetused indique qu'ils ne sont pas encore intégré dans le dev global. Ils sont pourtant fonctionnels même si à comléter pour la plupart. 
A NOTER : notyet.used.polyfill.js ne contient pas tout les polyfill(pour l'instant) certains qui sont nécessaires à un module ou l'autre sont intégrés directement. A corriger.
  notyetused.ecmascript6.js contient des spécifités à ES6 (pour l'instant uniquement la création de symboles) même si d'autres sont incluses soit dans le tronc commun soit dans les fichiers de module.
 notyetused.functional.form.js est à compléter même si déjà pas mal de funcs incluse(donc quelques nouveautés de balises HTML5), notyetused.functional.media.js ne contient qu'une petite interface pour API video player , notyetused.functional.color.js un convertisseur hexa 2 bits / rgb255, notyetused.functional.element.js est assez étoffé mais pas une nécessité réelle pour l'instant car pas mal de funcs déjà incluses dans tronc commun.

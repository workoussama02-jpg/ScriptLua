// ===================================================================
// SCRIPTS DATA - Edit this section to add/remove/modify scripts
// ===================================================================
// Each script object contains:
// - id: Unique identifier
// - position: Display order (lower numbers appear first)
// - name: Script name displayed on cards
// - category: Filter category (recolte, combat, quetes, prive, autres)
// - description: Short description for the card
// - badge: Optional badge (Premium, Populaire, Nouveau)
// - price: Monthly price in euros
// - image: Image filename (in img/ folder)
// - detailedDescription: Full description for detail page
// - instructions: Usage instructions (HTML supported)
// - formulas: Pricing formulas/options (HTML supported)
// ===================================================================

const scriptsData = [
    // ===== SCRIPT 1: Ressources Belladone =====
    {
        id: 1,
        position: 11,
        name: "Ressources pour la clef du donjon Belladone",
        category: "recolte",
        description: "Script recolte pour les ressources clef du donjon belladone",
        badge: "Gratuit via parrainage",
        price: 0,
        showPrice: false,
        showPricePrefix: false,
        priceLabel: "- Permanent",
        image: "ressourcesbelladone.png",
        detailedDescription: `
            <p>Ici vous trouverez tous les trajets récolte pour les ressources du donjon belladone :</p>
            <ul>
                <li>Tulipe en papier (Alchimiste)</li>
                <li>Pichon d'encre (Pêcheur)</li>
                <li>Quisnoa (Paysan)</li>
            </ul>
            <h4>Note :</h4>
            <ul>
                <li>Le script est gratuit pour les clients ayant acheté le script Belladone.</li>
                <li>N'hésitez pas à me contacter via discord si besoin.</li>
            </ul>
        `,
        instructions: `
            <ol>
                <li>Quisnoa : 2 ressources nécéssaires pour l'accès aux zones abysses.</li>
                <li>Pichon d'encre/Tulipe en papier : Quête Pandala.</li>
                <li>Script à lancer depuis une map où la ressource est présente.</li>
                <li>Métier niveau 200</li>
            </ol>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 Licence Permanente</h4>
                <p><strong>Gratuit via parrainage</strong></p>
                <p><strong>CODE: CLARTEK</strong></p>
            </div>
        `
    },
    // ===== SCRIPT 2: All Métiers =====
    {
        id: 2,
        position: 12,
        name: "Script All Métiers - Auto Leveling de 1 à 200",
        category: "recolte",
        description: "Script recolte qui gère automatiquement le leveling des métiers",
        badge: "",
        price: 49,
        showPrice: false,
        showPricePrefix: false,
        image: "allmetier.png",
        detailedDescription: `
            <p>Hello,</p>
            <p>Vous trouvez donc les 5 métiers du jeu : Alchimiste, Pecheur, Bucheron, Paysan, Mineur.</p>
            <p>Le script gère automatiquement le leveling des métiers, il suffit de lancez le script depuis le zaap Astrub.</p>
            <h4>Note :</h4>
            <ul>
                <li>Plusieurs updates sont prévus pour intégrer la gestion des settings afin que vous puissiez add vos maisons personnelles, ainsi que la gestion du craft.</li>
                <li>N'hésitez pas à me contacter sur Discord si besoin !</li>
            </ul>
        `,
        instructions: `
            <ul>
                <li>Lancer depuis zaap Astrub.</li>
            </ul>
        `,
        formulas: `
            <div class="formula-item">
                <h4>Hebdomadaire</h4>
                <p class="formula-price">$49</p>
                <p>7 jours</p>
            </div>
            <div class="formula-item">
                <h4>Mensuel</h4>
                <p class="formula-price">$99</p>
                <p>1 mois</p>
            </div>
            <div class="formula-item">
                <h4>Permanent</h4>
                <p class="formula-price">$179</p>
                <p>5 ans</p>
            </div>
        `
    },
    // ===== SCRIPT 3: Mallefisk =====
    {
        id: 3,
        position: 7,
        name: "Donjon Mallefisk - Cra 198/199 Low Cost",
        category: "combat",
        description: "Script de PL donjon Mallefisk optimisé pour Cra 198/199",
        badge: "Gratuit via parrainage",
        price: 200,
        showPrice: false,
        showPricePrefix: false,
        priceLabel: "- Permanent",
        image: "mallefisk.png",
        detailedDescription: `
            <p>Script de donjon Mallefisk optimisé pour Cra 198/199. Stuff low cost pour minimiser vos dépenses et maximiser vos gains.</p>
            <h4>Caractéristiques principales :</h4>
            <ul>
                <li>Optimisé pour Cra niveau 198-199</li>
                <li>Gestion automatique des combats</li>
                <li>Stuff Low Cost</li>
            </ul>
        `,
        instructions: `
            <ul>
                <li>Lancez le script depuis la map d'entrée ou de sortie du donjon Mallefisk, et tout ira bien !</li>
            </ul>
            <p><strong>Note :</strong> Nécessite un Cra niveau 198 minimum.</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 Licence Permanente</h4>
                <p><strong>Gratuit via parrainage</strong></p>
                <p><strong>CODE: CLARTEK</strong></p>
            </div>
        `
    },
    // ===== SCRIPT 4: Cire Momore =====
    {
        id: 4,
        position: 8,
        name: "Script Cire Momore - Elio/Ougi/Iop",
        category: "combat",
        description: "Script de donjon Cire Momore optimisé pour Elio, Ouginak et Iop",
        badge: "Gratuit via parrainage",
        price: 200,
        showPrice: false,
        showPricePrefix: false,
        priceLabel: "- Permanent",
        image: "ciremomore.png",
        detailedDescription: `
            <p>Script de farming de Cire Momore avec Elio, Ouginak et Iop.</p>
            <h4>Pour les stuffs :</h4>
            <ul>
                <li>Elio : <a href="https://i.ibb.co/6RrXGtrt/Elio-cmm.png" target="_blank">👉🏻Visitez ce lien</a></li>
                <li>Ougi : <a href="https://d-bk.net/fr/d/1NdP4" target="_blank">👉🏻Visitez ce lien</a></li>
                <li>Iop : <a href="https://i.ibb.co/jkp794wf/Iop-cmm.png" target="_blank">👉🏻Visitez ce lien</a></li>
            </ul>
            <h4>Note :</h4>
            <ul>
                <li>Le script est gratuit pour mes filleuls, n'hésitez pas à m'envoyer un message sur discord si vous en faites partie ;)</li>
            </ul>
        `,
        instructions: `
            <ul>
                <li>Parchotage 100 Air/Vita pour Ougi</li>
                <li>Parchotage 100 Terre/Vita Pour Iop</li>
                <li>Parchotage 100 Vita Pour Elio</li>
                <li>Quête Pour débloquer accès CMM</li>
            </ul>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 Licence Permanente</h4>
                <p><strong>Gratuit via parrainage</strong></p>
                <p><strong>CODE: CLARTEK</strong></p>
            </div>
        `
    },
    // ===== SCRIPT 5: Belladone B8 =====
    {
        id: 5,
        position: 2,
        name: "Donjon Belladone B8 - Elio/Panda/Forge + 5 Mules",
        category: "combat",
        description: "Script PL Donjon Belladone B8 optimisé pour Elio, Panda, Forge et 5 mules",
        badge: "Gratuit via parrainage",
        price: 412,
        showPrice: false,
        showPricePrefix: false,
        priceLabel: "- Permanent",
        image: "djbelladone.png",
        detailedDescription: `
            <p>Hello,</p>
            <p>Voici donc le belladone mis à jour avec de nouvelles techniques venues d'ailleurs !</p>
            <p>Le prix du stuff est entre 100 et 150 M maximum pour les 3 personnages.</p>
            <h4>Caractéristiques principales :</h4>
            <ul>
                <li>Le script capture les salles du donjons.</li>
                <li>Une grande liste de challenges est incluse.</li>
            </ul>
        `,
        instructions: `
            <ol>
                <li>Configurer la gestion de combat (en IA avancée) sur Snowbot.</li>
                <li>Garder le fichier Settings.lua dans le meme dossier que le script.</li>
                <li>Lancer le script depuis l'entrée du donjon.</li>
            </ol>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 Licence Permanente</h4>
                <p><strong>Gratuit via parrainage</strong></p>
                <p><strong>CODE: CLARTEK</strong></p>
            </div>
        `
    },
    // ===== SCRIPT 6: PL Arene =====
    {
        id: 6,
        position: 3,
        name: "PL Arene - Captures Belladone",
        category: "combat",
        description: "Script PL Arene capture Belladone optimisé pour Up vos mules rapidement",
        badge: "",
        price: 294,
        showPrice: false,
        showPricePrefix: false,
        priceLabel: "- Permanent",
        image: "plarenebelladone.png",
        detailedDescription: `
            <p>Script de power-leveling Belladone en arène. Le plus rapide du marché.</p>
            <h4>Caractéristiques principales :</h4>
            <ul>
                <li>Power-leveling ultra rapide</li>
                <li>Script bien optimisée</li>
            </ul>
        `,
        instructions: `
            <ul>
                <li>Si tout est bon (Stuffs, etc), vous avez juste a lancer le script depuis la map Arene !</li>
            </ul>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 Licence Permanente</h4>
                <p class="formula-price">$294</p>
                <p>Accès illimité au script PL Arene</p>
            </div>
        `
    },
    // ===== SCRIPT 7: Otomai =====
    {
        id: 7,
        position: 13,
        name: "Quêtes : Otomaï",
        category: "quetes",
        description: "Script de quêtes pour accéder à l'île d'Otomaï.",
        badge: "Gratuit via parrainage",
        price: 0,
        showPrice: false,
        showPricePrefix: false,
        priceLabel: "",
        image: "queteotomail.png",
        detailedDescription: `
            <p>Script de quêtes pour l'île d'Otomaï.</p>
        `,
        instructions: `<p>Lancez le script depuis zaap astrub.</p>`,
        formulas: `
            <div class="formula-item">
                <h4>📦 Licence Permanente</h4>
                <p><strong>Gratuit via parrainage</strong></p>
                <p><strong>CODE: CLARTEK</strong></p>
            </div>
        `
    },
    // ===== SCRIPT 8: Team Succes =====
    {
        id: 8,
        position: 1,
        name: "Team Succes",
        category: "prive",
        description: "Script Team Cra Socket optimisé pour Snowbot, conçu pour une rentabilité et une vitesse maximales.",
        badge: "",
        price: 1000,
        showPrice: true,
        showPricePrefix: true,
        image: "teamsucces.png",
        detailedDescription: `
            <p>Script Socket optimisé pour Snowbot, conçu pour une rentabilité et une vitesse maximales.</p>
            <p>Il permet de lancer plusieurs teams en simultané, avec des runs très rapides, des stuffs low cost et efficaces, et un gain moyen de 18 à 21 millions par run.</p>
            <p>Une solution scalable et performante, incluant des scripts PL pour monter rapidement les Cra.</p>
            <h4>Note :</h4>
            <ul>
                <li>N’hésitez pas à me contacter sur Discord pour les scripts PL</li>
            </ul>
        `,
        instructions: `<p>Les Cras sont à lancer depuis zaap astrub, c'est tout !</p>`,
        formulas: `
            <div class="formula-item">
                <h4>📦 Licence Permanente</h4>
                <p class="formula-price">$1500</p>
                <p>Accès illimité au script Team Succes</p>
            </div>
            <div class="formula-item">
                <h4>📦 Licence 6 Mois</h4>
                <p class="formula-price">$1000</p>
                <p>Accès limité au script Team Succes</p>
            </div>
        `
    },
    // ===== SCRIPT 9: HDV =====
    {
        id: 9,
        position: 9,
        name: "Script Hotel de Vente (HDV)",
        category: "autres",
        description: "Script HDV optimisé pour Snowbot.",
        badge: "Gratuit via parrainage",
        price: 100,
        showPrice: false,
        showPricePrefix: false,
        priceLabel: "- Permanent",
        image: "hdv.png",
        detailedDescription: `
            <p>Hello,</p>
            <p>Voici aussi le script HDV à download pour Snowbot.</p>
            <p>Je vous partage le code source, comme ça vous avez juste à changer les ID's des items en fonction de ce que vous voulez mettre en vente.</p>
            <h4>Note :</h4>
            <ul>
                <li>Evidemment vous avez le droit de modifier/utiliser le script à votre guise, n'hésitez pas non plus à m'envoyer un mp sur discord si vous avez besoin d'aide.</li>
            </ul>
        `,
        instructions: `
            <p>Lancer depuis une map HDV.</p>
            <h4>Attention :</h4>
            <ul>
                <li>Vérifiez bien que l'ElementID dans le script correspond à l'ElementID de l'Hotel de vente (Vous pouvez le trouver en utilisant un clique droit sur l'HDV depuis votre map sur l'interface de Snowbot).</li>
            </ul>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 Licence Permanente</h4>
                <p><strong>Gratuit via parrainage</strong></p>
                <p><strong>CODE: CLARTEK</strong></p>
            </div>
        `
    },
    // ===== SCRIPT 10: Auto Leveling =====
    {
        id: 10,
        position: 10,
        name: "Auto Leveling 1 - 50 - Sans Abonnement",
        category: "autres",
        description: "Script Auto-Leveling pour monter vos mules du level 1 à 50 sans abonnement.",
        badge: "Gratuit via parrainage",
        price: 120,
        showPrice: false,
        showPricePrefix: false,
        priceLabel: "- Permanent",
        image: "autoleveling150.png",
        detailedDescription: `
            <p>Hello,</p>
            <p>Pas compliqué le script, il suffit de lancer le bot depuis zaap astrub avec 10.000kamas, puis laissez tourner pendant des heures.</p>
        `,
        instructions: `
            <p>Pour le moment, si vous voulez une IA pour une autre Classe que Cra, remplacez le fichier IA1 par votre IA1 qui contient l'IA du personnage au lvl 1, puis IA2 par celle du level 35, et enfin IA3 au level 40</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 License Permanente</h4>
                <p><strong>Gratuit via parrainage</strong></p>
                <p><strong>CODE: CLARTEK</strong></p>
            </div>
        `
    },
    // ===== SCRIPT 11: Koutoulou =====
    {
        id: 11,
        position: 6,
        name: "Koutoulou - IA avancée",
        category: "combat",
        description: "Script farm Ailes de Koutoulou avec IA avancée pour Snowbot.",
        badge: "Gratuit via parrainage",
        price: 200,
        showPrice: false,
        showPricePrefix: false,
        priceLabel: "- Permanent",
        image: "Koutoulou.png",
        detailedDescription: `
            <p>Hello,</p>
            <p>On vous propose le script gratuitement sur snowbot sous conditions :)</p>
            <p>Le script farment les ailes koutoulou qui coutent assez cher, il suffit de suivre la doc et tout ira bien !</p>
        `,
        instructions: `
            <p>Contactez <b>@Darko</b> ou <b>@Upheaval</b> sur Discord si jamais vous avez besoin d'aide</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 License Permanente</h4>
                <p><strong>Gratuit via parrainage</strong></p>
                <p><strong>CODE: CLARTEK</strong></p>
            </div>
        `
    },
    // ===== SCRIPT 12: PL Toxoliath =====
    {
        id: 12,
        position: 4,
        name: "PL Toxoliath - Butin 8",
        category: "combat",
        description: "Script PL Donjon Toxoliath B8 optimisé pour 3 Cra et 1 Enutrof + 4 mules sasa",
        badge: "Gratuit via parrainage",
        price: 600,
        showPrice: false,
        showPricePrefix: false,
        priceLabel: "- Permanent",
        image: "toxo.png",
        detailedDescription: `
            <p>Hello, tout est dans la doc normalement !</p>
            <p>Pour pouvoir avoir ce script gratuitement il faut avoir déposé 250$ sur snowbot (en passant par mon lien de parrainage) pour acheter la licence du bot, ou du script, ou autre ...</p>
        `,
        instructions: `
            <p>Contactez <b>@Darko</b> ou <b>@Upheaval</b> sur Discord si jamais vous avez besoin d'aide</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 License Permanente</h4>
                <p><strong>Gratuit via parrainage</strong></p>
                <p><strong>CODE: CLARTEK</strong></p>
            </div>
        `
    },
    // ===== SCRIPT 13: Donjon Klime =====
    {
        id: 13,
        position: 5,
        name: "Donjon Klime - Auto Win",
        category: "Prive",
        description: "Retrouvez le script du farm Klime + Captures Auto Win",
        badge: "Gratuit via parrainage",
        price: 0,
        showPrice: false,
        showPricePrefix: false,
        image: "klime.png",
        detailedDescription: `
            <p>Hello, retrouvez le script du farm Klime + Captures avec une compo Auto Win !</p>
            <p>Pour pouvoir avoir ce script gratuitement il faut avoir déposé 200$ sur snowbot (en passant par mon lien de parrainage) pour acheter la licence du bot, ou du script, ou autre ...</p>
        `,
        instructions: `
            <p>Contactez les modérateurs de ScriptLua si jamais besoin d'aide pour l'installation.</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 License Permanente</h4>
                <p><strong>Gratuit via parrainage</strong></p>
                <p><strong>CODE: CLARTEK</strong></p>
            </div>
        `
    },
        /* Uncomment and fill in more scripts as needed
    {
        id: 14,
        name: "",
        category: "",
        description: "Coming soon.",
        badge: "",
        price: 0,
        showPrice: false,
        showPricePrefix: "",
        image: "",
        detailedDescription: `
            <p>Hello, tout est dans la doc normalement !</p>
            <p>Pour pouvoir avoir ce script gratuitement il faut avoir déposé 250$ sur snowbot (en passant par mon lien de parrainage) pour acheter la licence du bot, ou du script, ou autre ...</p>
        `,
        instructions: `
            <p>Contactez <b>@Darko</b> ou <b>@Upheaval</b> sur Discord si jamais vous avez besoin d'aide</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 License Permanente</h4>
                <p class="formula-price">$0</p>
                <p>Prix à déterminer</p>
            </div>
        `
    },
    {
        id: 15,
        name: "",
        category: "",
        description: "Coming soon.",
        badge: "",
        price: 0,
        showPrice: false,
        showPricePrefix: "",
        image: "",
        detailedDescription: `
            <p>Hello, tout est dans la doc normalement !</p>
            <p>Pour pouvoir avoir ce script gratuitement il faut avoir déposé 250$ sur snowbot (en passant par mon lien de parrainage) pour acheter la licence du bot, ou du script, ou autre ...</p>
        `,
        instructions: `
            <p>Contactez <b>@Darko</b> ou <b>@Upheaval</b> sur Discord si jamais vous avez besoin d'aide</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 License Permanente</h4>
                <p class="formula-price">$0</p>
                <p>Prix à déterminer</p>
            </div>
        `
    },
    {
        id: 16,
        name: "",
        category: "",
        description: "Coming soon.",
        badge: "",
        price: 0,
        showPrice: false,
        showPricePrefix: "",
        image: "",
        detailedDescription: `
            <p>Hello, tout est dans la doc normalement !</p>
            <p>Pour pouvoir avoir ce script gratuitement il faut avoir déposé 250$ sur snowbot (en passant par mon lien de parrainage) pour acheter la licence du bot, ou du script, ou autre ...</p>
        `,
        instructions: `
            <p>Contactez <b>@Darko</b> ou <b>@Upheaval</b> sur Discord si jamais vous avez besoin d'aide</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 License Permanente</h4>
                <p class="formula-price">$0</p>
                <p>Prix à déterminer</p>
            </div>
        `
    },
    {
        id: 17,
        name: "",
        category: "",
        description: "Coming soon.",
        badge: "",
        price: 0,
        showPrice: false,
        showPricePrefix: "",
        image: "",
        detailedDescription: `
            <p>Hello, tout est dans la doc normalement !</p>
            <p>Pour pouvoir avoir ce script gratuitement il faut avoir déposé 250$ sur snowbot (en passant par mon lien de parrainage) pour acheter la licence du bot, ou du script, ou autre ...</p>
        `,
        instructions: `
            <p>Contactez <b>@Darko</b> ou <b>@Upheaval</b> sur Discord si jamais vous avez besoin d'aide</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 License Permanente</h4>
                <p class="formula-price">$0</p>
                <p>Prix à déterminer</p>
            </div>
        `
    },
    {
        id: 18,
        name: "",
        category: "",
        description: "Coming soon.",
        badge: "",
        price: 0,
        showPrice: false,
        showPricePrefix: "",
        image: "",
        detailedDescription: `
            <p>Hello, tout est dans la doc normalement !</p>
            <p>Pour pouvoir avoir ce script gratuitement il faut avoir déposé 250$ sur snowbot (en passant par mon lien de parrainage) pour acheter la licence du bot, ou du script, ou autre ...</p>
        `,
        instructions: `
            <p>Contactez <b>@Darko</b> ou <b>@Upheaval</b> sur Discord si jamais vous avez besoin d'aide</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 License Permanente</h4>
                <p class="formula-price">$0</p>
                <p>Prix à déterminer</p>
            </div>
        `
    },
    {
        id: 19,
        name: "",
        category: "",
        description: "Coming soon.",
        badge: "",
        price: 0,
        showPrice: false,
        showPricePrefix: "",
        image: "",
        detailedDescription: `
            <p>Hello, tout est dans la doc normalement !</p>
            <p>Pour pouvoir avoir ce script gratuitement il faut avoir déposé 250$ sur snowbot (en passant par mon lien de parrainage) pour acheter la licence du bot, ou du script, ou autre ...</p>
        `,
        instructions: `
            <p>Contactez <b>@Darko</b> ou <b>@Upheaval</b> sur Discord si jamais vous avez besoin d'aide</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 License Permanente</h4>
                <p class="formula-price">$0</p>
                <p>Prix à déterminer</p>
            </div>
        `
    },
    {
        id: 20,
        name: "",
        category: "",
        description: "Coming soon.",
        badge: "",
        price: 0,
        showPrice: false,
        showPricePrefix: "",
        image: "",
        detailedDescription: `
            <p>Hello, tout est dans la doc normalement !</p>
            <p>Pour pouvoir avoir ce script gratuitement il faut avoir déposé 250$ sur snowbot (en passant par mon lien de parrainage) pour acheter la licence du bot, ou du script, ou autre ...</p>
        `,
        instructions: `
            <p>Contactez <b>@Darko</b> ou <b>@Upheaval</b> sur Discord si jamais vous avez besoin d'aide</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 License Permanente</h4>
                <p class="formula-price">$0</p>
                <p>Prix à déterminer</p>
            </div>
        `
    },
    {
        id: 21,
        name: "",
        category: "",
        description: "Coming soon.",
        badge: "",
        price: 0,
        showPrice: false,
        showPricePrefix: "",
        image: "",
        detailedDescription: `
            <p>Hello, tout est dans la doc normalement !</p>
            <p>Pour pouvoir avoir ce script gratuitement il faut avoir déposé 250$ sur snowbot (en passant par mon lien de parrainage) pour acheter la licence du bot, ou du script, ou autre ...</p>
        `,
        instructions: `
            <p>Contactez <b>@Darko</b> ou <b>@Upheaval</b> sur Discord si jamais vous avez besoin d'aide</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 License Permanente</h4>
                <p class="formula-price">$0</p>
                <p>Prix à déterminer</p>
            </div>
        `
    },
    {
        id: 22,
        name: "",
        category: "",
        description: "Coming soon.",
        badge: "",
        price: 0,
        showPrice: false,
        showPricePrefix: "",
        image: "",
        detailedDescription: `
            <p>Hello, tout est dans la doc normalement !</p>
            <p>Pour pouvoir avoir ce script gratuitement il faut avoir déposé 250$ sur snowbot (en passant par mon lien de parrainage) pour acheter la licence du bot, ou du script, ou autre ...</p>
        `,
        instructions: `
            <p>Contactez <b>@Darko</b> ou <b>@Upheaval</b> sur Discord si jamais vous avez besoin d'aide</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 License Permanente</h4>
                <p class="formula-price">$0</p>
                <p>Prix à déterminer</p>
            </div>
        `
    },
    {
        id: 23,
        name: "",
        category: "",
        description: "Coming soon.",
        badge: "",
        price: 0,
        showPrice: false,
        showPricePrefix: "",
        image: "",
        detailedDescription: `
            <p>Hello, tout est dans la doc normalement !</p>
            <p>Pour pouvoir avoir ce script gratuitement il faut avoir déposé 250$ sur snowbot (en passant par mon lien de parrainage) pour acheter la licence du bot, ou du script, ou autre ...</p>
        `,
        instructions: `
            <p>Contactez <b>@Darko</b> ou <b>@Upheaval</b> sur Discord si jamais vous avez besoin d'aide</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 License Permanente</h4>
                <p class="formula-price">$0</p>
                <p>Prix à déterminer</p>
            </div>
        `
    },
    {
        id: 24,
        name: "",
        category: "",
        description: "Coming soon.",
        badge: "",
        price: 0,
        showPrice: false,
        showPricePrefix: "",
        image: "",
        detailedDescription: `
            <p>Hello, tout est dans la doc normalement !</p>
            <p>Pour pouvoir avoir ce script gratuitement il faut avoir déposé 250$ sur snowbot (en passant par mon lien de parrainage) pour acheter la licence du bot, ou du script, ou autre ...</p>
        `,
        instructions: `
            <p>Contactez <b>@Darko</b> ou <b>@Upheaval</b> sur Discord si jamais vous avez besoin d'aide</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 License Permanente</h4>
                <p class="formula-price">$0</p>
                <p>Prix à déterminer</p>
            </div>
        `
    },
    {
        id: 25,
        name: "",
        category: "",
        description: "Coming soon.",
        badge: "",
        price: 0,
        showPrice: false,
        showPricePrefix: "",
        image: "",
        detailedDescription: `
            <p>Hello, tout est dans la doc normalement !</p>
            <p>Pour pouvoir avoir ce script gratuitement il faut avoir déposé 250$ sur snowbot (en passant par mon lien de parrainage) pour acheter la licence du bot, ou du script, ou autre ...</p>
        `,
        instructions: `
            <p>Contactez <b>@Darko</b> ou <b>@Upheaval</b> sur Discord si jamais vous avez besoin d'aide</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 License Permanente</h4>
                <p class="formula-price">$0</p>
                <p>Prix à déterminer</p>
            </div>
        `
    },
    {
        id: 26,
        name: "",
        category: "",
        description: "Coming soon.",
        badge: "",
        price: 0,
        showPrice: false,
        showPricePrefix: "",
        image: "",
        detailedDescription: `
            <p>Hello, tout est dans la doc normalement !</p>
            <p>Pour pouvoir avoir ce script gratuitement il faut avoir déposé 250$ sur snowbot (en passant par mon lien de parrainage) pour acheter la licence du bot, ou du script, ou autre ...</p>
        `,
        instructions: `
            <p>Contactez <b>@Darko</b> ou <b>@Upheaval</b> sur Discord si jamais vous avez besoin d'aide</p>
        `,
        formulas: `
            <div class="formula-item">
                <h4>📦 License Permanente</h4>
                <p class="formula-price">$0</p>
                <p>Prix à déterminer</p>
            </div>
        `
    }
    */
    
];

// Load Scripts from embedded data
function loadScripts() {
    displayScripts(scriptsData);
}

function displayScripts(scripts) {
    const container = document.getElementById('scriptsContainer');
    if (!container) return;
    
    container.innerHTML = ''; // Clear existing content
    
    // Sort scripts by position property
    const sortedScripts = [...scripts].sort((a, b) => {
        const posA = a.position !== undefined ? a.position : 999;
        const posB = b.position !== undefined ? b.position : 999;
        return posA - posB;
    });
    
    sortedScripts.forEach((script, index) => {
        const scriptCard = createScriptCard(script);
        // Add staggered animation
        scriptCard.style.opacity = '0';
        scriptCard.style.transform = 'translateY(20px)';
        container.appendChild(scriptCard);
        
        setTimeout(() => {
            scriptCard.style.transition = 'all 0.3s ease';
            scriptCard.style.opacity = '1';
            scriptCard.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ===================================================================
// CREATE SCRIPT CARD - Generates a script card element
// ===================================================================
function createScriptCard(script) {
    const card = document.createElement('div');
    card.className = 'script-card';
    card.setAttribute('data-category', script.category);
    card.style.cursor = 'pointer';
    
    const badgeHTML = script.badge ? `<div class="script-badge">${script.badge}</div>` : '';
    
    // Image HTML - show placeholder if no image provided
    const imageHTML = script.image 
        ? `<div class="script-image" style="background-image: url('img/${script.image}');"></div>`
        : `<div class="script-image script-image-placeholder"><span>🎮</span></div>`;
    
    // Conditionally add "à partir de" prefix and "/mois" suffix
    const pricePrefix = script.showPricePrefix !== false ? 'à partir de ' : '';
    const priceSuffix = script.showPricePrefix !== false ? '' : '';
    
    // Add custom price label if defined
    const priceLabel = script.priceLabel ? ` <span style="font-size: 0.85em; opacity: 0.9;">${script.priceLabel}</span>` : '';
    
    // Build price HTML - only show if showPrice is not false
    // Format price without decimals if it's a whole number
    const formattedPrice = script.price % 1 === 0 ? script.price.toFixed(0) : script.price.toFixed(2);
    const priceHTML = script.showPrice !== false 
        ? `<div class="script-price">${pricePrefix}$${formattedPrice}${priceSuffix}${priceLabel}</div>`
        : '';
    
    card.innerHTML = `
        ${badgeHTML}
        ${imageHTML}
        <h3>${script.name || 'Script à venir'}</h3>
        <p class="script-description">${script.description}</p>
        ${priceHTML}
        <button class="btn btn-primary" data-script-id="${script.id}">Voir détails</button>
    `;
    
    // Add click event to show detail view
    card.addEventListener('click', function(e) {
        // Don't trigger if clicking the button directly (it has its own handler)
        if (!e.target.classList.contains('btn-primary')) {
            showScriptDetail(script.id);
        }
    });
    
    // Add button click handler
    const btn = card.querySelector('.btn-primary');
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        showScriptDetail(script.id);
    });
    
    return card;
}

// ===================================================================
// SHOW SCRIPT DETAIL - Display detailed view for a specific script
// ===================================================================
function showScriptDetail(scriptId) {
    const script = scriptsData.find(s => s.id === scriptId);
    if (!script) return;
    
    // Hide scripts list, show detail view
    document.getElementById('scriptsListSection').style.display = 'none';
    document.getElementById('scriptDetailSection').style.display = 'block';
    
    // Populate detail view
    const detailImage = document.querySelector('#detailImage img');
    if (script.image) {
        detailImage.src = `img/${script.image}`;
        detailImage.alt = script.name;
    } else {
        detailImage.src = 'img/script-placeholder.jpg';
        detailImage.alt = 'Script placeholder';
    }
    
    document.getElementById('detailTitle').textContent = script.name || 'Script à venir';
    document.getElementById('detailPrice').innerHTML = ``; // Price hidden - shown in Formules tab
    
    // Populate tabs
    document.getElementById('detailDescription').innerHTML = script.detailedDescription || script.description;
    document.getElementById('detailInstructions').innerHTML = script.instructions || '<p>Instructions à venir.</p>';
    document.getElementById('detailFormules').innerHTML = script.formulas || '<p>Formules à venir.</p>';
    
    // Reset to first tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelector('.tab-btn[data-tab="description"]').classList.add('active');
    document.getElementById('descriptionTab').classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================================================
// HIDE SCRIPT DETAIL - Return to scripts list
// ===================================================================
function hideScriptDetail() {
    document.getElementById('scriptDetailSection').style.display = 'none';
    document.getElementById('scriptsListSection').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================================================
// TAB SWITCHING - Handle tab clicks in detail view
// ===================================================================
function switchTab(tabName) {
    // Remove active class from all tabs and panels
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    
    // Add active class to selected tab and panel
    document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}Tab`).classList.add('active');
}

// ===================================================================
// PROMOTIONAL BANNER - Copy Promo Code
// ===================================================================
function copyPromoCode() {
    const promoCode = 'CLARTEK';
    navigator.clipboard.writeText(promoCode).then(function() {
        showNotification('Code promo copié : ' + promoCode, 'success');
    }).catch(function() {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = promoCode;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showNotification('Code promo copié : ' + promoCode, 'success');
    });
}

// Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Load scripts if on scripts page
    if (document.getElementById('scriptsContainer')) {
        loadScripts();
    }

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Script Filters - Updated to work with dynamically loaded scripts
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            const scriptCards = document.querySelectorAll('.script-card');

            scriptCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category').toLowerCase();
                if (filter === 'all' || cardCategory === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ===================================================================
    // SCRIPT DETAIL VIEW EVENT LISTENERS
    // ===================================================================
    
    // Back to Scripts button
    const backToScriptsBtn = document.getElementById('backToScriptsBtn');
    if (backToScriptsBtn) {
        backToScriptsBtn.addEventListener('click', hideScriptDetail);
    }
    
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Discord contact button
    const contactDiscordBtn = document.getElementById('contactDiscordBtn');
    if (contactDiscordBtn) {
        contactDiscordBtn.addEventListener('click', function() {
            window.open('https://snowbot.eu/dashboard/marketplace/seller/8', '_blank');
        });
    }

    // ===================================================================
    // POWER LEVELING
    // ===================================================================
    
    // Power Leveling Order Button
    const orderPowerLevelingBtn = document.getElementById('orderPowerLevelingBtn');
    if (orderPowerLevelingBtn) {
        orderPowerLevelingBtn.addEventListener('click', function() {
            window.open('https://discord.gg/C5FP62dRU3', '_blank');
        });
    }

    // Power Leveling Calculator
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculatePrice);
    }

    function calculatePrice() {
        const currentLevel = parseInt(document.getElementById('currentLevel').value) || 1;
        const targetLevel = parseInt(document.getElementById('targetLevel').value) || 50;
        const packageType = document.getElementById('packageType').value;

        if (targetLevel <= currentLevel) {
            alert('Le niveau souhaité doit être supérieur au niveau actuel!');
            return;
        }

        const levelDifference = targetLevel - currentLevel;
        
        // Prices per 10 levels
        const prices = {
            basic: 29.99,
            premium: 49.99,
            elite: 79.99
        };

        // Time in days per 10 levels
        const times = {
            basic: { min: 3, max: 5 },
            premium: { min: 1, max: 2 },
            elite: { min: 0.5, max: 1 }
        };

        const price = (levelDifference / 10) * prices[packageType];
        const timeMin = (levelDifference / 10) * times[packageType].min;
        const timeMax = (levelDifference / 10) * times[packageType].max;

        document.getElementById('resultPrice').textContent = '€' + price.toFixed(2);
        
        if (timeMin < 1) {
            document.getElementById('resultTime').textContent = Math.round(timeMin * 24) + '-' + Math.round(timeMax * 24) + ' heures';
        } else {
            document.getElementById('resultTime').textContent = Math.ceil(timeMin) + '-' + Math.ceil(timeMax) + ' jours';
        }
    }

    // FAQ Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Auth Tabs
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and forms
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Show corresponding form
            if (targetTab === 'login') {
                document.getElementById('loginForm').classList.add('active');
            } else {
                document.getElementById('registerForm').classList.add('active');
            }
        });
    });

    // Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Simulate login (in real app, this would make an API call)
            if (email && password) {
                // Store user in localStorage (demo purposes)
                localStorage.setItem('user', JSON.stringify({
                    email: email,
                    name: email.split('@')[0]
                }));

                // Hide login form, show dashboard
                document.querySelector('.auth-container').style.display = 'none';
                document.getElementById('dashboard').style.display = 'block';
                
                // Update username
                document.getElementById('userName').textContent = email.split('@')[0];

                // Show success message
                showNotification('Connexion réussie!', 'success');
            }
        });
    }

    // Register Form Handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const acceptTerms = document.getElementById('acceptTerms').checked;

            if (!acceptTerms) {
                showNotification('Veuillez accepter les conditions d\'utilisation', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showNotification('Les mots de passe ne correspondent pas', 'error');
                return;
            }

            if (username && email && password) {
                // Store user in localStorage (demo purposes)
                localStorage.setItem('user', JSON.stringify({
                    email: email,
                    name: username
                }));

                showNotification('Inscription réussie! Vous pouvez maintenant vous connecter.', 'success');
                
                // Switch to login tab
                document.querySelector('[data-tab="login"]').click();
            }
        });
    }

    // Logout Handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('user');
            document.querySelector('.auth-container').style.display = 'block';
            document.getElementById('dashboard').style.display = 'none';
            showNotification('Déconnexion réussie', 'success');
        });
    }

    // Check if user is logged in on page load
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && document.getElementById('dashboard')) {
        document.querySelector('.auth-container').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('userName').textContent = user.name;
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Message envoyé avec succès! Nous vous répondrons bientôt.', 'success');
            this.reset();
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#00b894' : type === 'error' ? '#ff7675' : '#6c5ce7'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add animations to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add hover effect to cards
    const cards = document.querySelectorAll('.feature-card, .package-card, .proxy-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    // Purchase buttons simulation
    const buyButtons = document.querySelectorAll('.btn-primary');
    buyButtons.forEach(btn => {
        if (btn.textContent.includes('Acheter') || btn.textContent.includes('Commander') || btn.textContent.includes('Choisir')) {
            btn.addEventListener('click', function(e) {
                if (!this.closest('form')) {
                    e.preventDefault();
                    showNotification('Fonctionnalité d\'achat en cours de développement', 'info');
                }
            });
        }
    });

    console.log('🎮 Script Lua Website Loaded Successfully!');
});

// ===================================================================
// CLERK AUTHENTICATION INITIALIZATION
// ===================================================================
window.addEventListener('load', async () => {
    console.log('🚀 Page loaded, checking for espace-client page...');
    // Check if we're on the espace-client page
    if (!document.getElementById('clerk-signin')) {
        console.log('❌ Not on espace-client page, skipping Clerk initialization');
        return;
    }

    console.log('✅ On espace-client page, initializing Clerk...');

    // Wait for Clerk to load before showing/hiding auth container
    const waitForClerk = () => {
        return new Promise((resolve) => {
            if (window.Clerk) {
                resolve();
                return;
            }
            const checkClerk = () => {
                if (window.Clerk) {
                    resolve();
                } else {
                    setTimeout(checkClerk, 100);
                }
            };
            checkClerk();
        });
    };

    // Check if Clerk is available before trying to load it
    if (window.Clerk) {
        try {
            console.log('⏳ Waiting for Clerk to be available...');
            await waitForClerk();
            console.log('✅ Clerk object found, loading Clerk...');
            await window.Clerk.load();
            console.log('✅ Clerk loaded successfully');

            const signInDiv = document.getElementById('clerk-signin');
            const authContainer = document.getElementById('clerk-auth-container');

            // Auth container should be visible by default (not hidden in HTML anymore)
            // Only hide it when user is successfully authenticated

            // Check authentication status after Clerk is loaded
            const isAuthenticated = window.Clerk.user && window.Clerk.user.id;
            console.log('🔐 Clerk loaded, user authenticated:', isAuthenticated);

            if (!isAuthenticated && signInDiv) {
                // User is not signed in, show the Clerk sign-in component
                console.log('🔐 User not authenticated, mounting sign-in component');
                const authContainer = document.getElementById('clerk-auth-container');
                if (authContainer) {
                    authContainer.classList.add('show');
                    console.log('🔐 Auth container found and show class added, classes:', authContainer.className);
                } else {
                    console.error('🔐 Auth container not found!');
                }
                window.Clerk.mountSignIn(signInDiv, {
                    appearance: {
                        elements: {
                            rootBox: 'clerk-root-box',
                            card: 'clerk-card',
                            headerTitle: 'clerk-header-title',
                            headerSubtitle: 'clerk-header-subtitle',
                            socialButtonsBlockButton: 'clerk-social-btn',
                            formButtonPrimary: 'clerk-primary-btn',
                            footerActionLink: 'clerk-link'
                        },
                        layout: {
                            socialButtonsPlacement: 'bottom',
                            socialButtonsVariant: 'blockButton'
                        }
                    }
                });
            } else if (isAuthenticated) {
                // User is already signed in, hide auth container and initialize ticketing system
                console.log('✅ User already authenticated on page load:', window.Clerk.user);
                if (authContainer) authContainer.classList.remove('show');

                // Check if already initialized to prevent duplicate calls
                if (!isInitialized) {
                    initializeTicketingSystem();
                }
            } else {
                // Clerk loaded but user status unclear, show auth container
                console.log('🔐 Clerk loaded but user status unclear, showing auth container');
                if (authContainer) authContainer.style.display = 'block';
            }

            // Set up Clerk authentication state change listener
            window.Clerk.addListener((authState) => {
                console.log('� Clerk auth state changed:', authState);
                console.log('🔄 Current user object:', window.Clerk.user);

                // Check if user is actually authenticated
                if (window.Clerk.user && window.Clerk.user.id) {
                    // User is signed in
                    const authContainer = document.getElementById('clerk-auth-container');
                    if (authContainer) {
                        authContainer.classList.remove('show');
                        console.log('🔒 Auth container hidden, classList:', authContainer.className);
                        console.log('🔐 Auth container hidden for authenticated user');
                    }

                    console.log('✅ User authenticated with Clerk:', window.Clerk.user);
                    // Check if already initialized to prevent duplicate calls
                    if (!isInitialized) {
                        initializeTicketingSystem();
                    }
                } else {
                    // User is signed out or not authenticated
                    console.log('❌ User not authenticated or signed out');
                    const dashboards = ['client-dashboard', 'moderator-dashboard', 'admin-dashboard'];
                    dashboards.forEach(id => {
                        const dashboard = document.getElementById(id);
                        if (dashboard) dashboard.style.display = 'none';
                    });
                    const authContainer = document.getElementById('clerk-auth-container');
                    if (authContainer) {
                        authContainer.classList.add('show');
                        console.log('🔓 Auth container shown, classList:', authContainer.className);
                        console.log('🔐 Auth container shown for signed out user, classes:', authContainer.className);
                        // Remount sign-in component if not already mounted
                        const signInDiv = document.getElementById('clerk-signin');
                        if (signInDiv && signInDiv.children.length === 0) {
                            console.log('🔐 Remounting sign-in component');
                            signInDiv.innerHTML = ''; // Clear any existing content
                            window.Clerk.mountSignIn(signInDiv, {
                                appearance: {
                                    elements: {
                                        rootBox: 'clerk-root-box',
                                        card: 'clerk-card',
                                        headerTitle: 'clerk-header-title',
                                        headerSubtitle: 'clerk-header-subtitle',
                                        socialButtonsBlockButton: 'clerk-social-btn',
                                        formButtonPrimary: 'clerk-primary-btn',
                                        footerActionLink: 'clerk-link'
                                    },
                                    layout: {
                                        socialButtonsPlacement: 'bottom',
                                        socialButtonsVariant: 'blockButton'
                                    }
                                }
                            });
                            console.log('🔐 Sign-in component mounted, signInDiv children:', signInDiv.children.length);
                        }
                    }

                    // Reset initialization flag on logout
                    isInitialized = false;

                    // Clean up real-time subscriptions
                    if (chatChannel) {
                        supabaseClient.removeChannel(chatChannel);
                        chatChannel = null;
                    }
                    if (ticketsChannel) {
                        supabaseClient.removeChannel(ticketsChannel);
                        ticketsChannel = null;
                    }
                    currentTicketId = null;
                }
            });

        } catch (error) {
            console.error('❌ Error loading Clerk:', error);
            // Show auth container on error
            const authContainer = document.getElementById('clerk-auth-container');
            if (authContainer) authContainer.classList.add('show');
            showNotification('Erreur de chargement de l\'authentification', 'error');
        }
    } else {
        console.error('❌ Clerk not available after page load');
        // Show auth container if Clerk is not available
        const authContainer = document.getElementById('clerk-auth-container');
        if (authContainer) authContainer.classList.add('show');
    }
});

// Show dashboard when user is authenticated
function showClerkDashboard(user) {
    const clerkContainer = document.getElementById('clerk-auth-container');
    const dashboard = document.getElementById('dashboard');
    const userName = document.getElementById('userName');
    
    if (clerkContainer) clerkContainer.classList.remove('show');
    if (dashboard) dashboard.style.display = 'block';
    
    // Update user name
    if (userName) {
        const displayName = user.firstName || 
                          user.username || 
                          user.emailAddresses[0]?.emailAddress.split('@')[0] || 
                          'Joueur';
        userName.textContent = displayName;
    }
    
    console.log('✅ User authenticated:', user);
}

// Hide dashboard and show auth form
function hideClerkDashboard() {
    const clerkContainer = document.getElementById('clerk-auth-container');
    const dashboard = document.getElementById('dashboard');
    
    if (clerkContainer) clerkContainer.classList.add('show');
    if (dashboard) dashboard.style.display = 'none';
    
    // Remount sign-in component
    const signInDiv = document.getElementById('clerk-signin');
    if (signInDiv && window.Clerk) {
        signInDiv.innerHTML = '';
        window.Clerk.mountSignIn(signInDiv, {
            appearance: {
                elements: {
                    rootBox: 'clerk-root-box',
                    card: 'clerk-card'
                }
            }
        });
    }
}

// Handle logout button
document.addEventListener('DOMContentLoaded', function() {
    // Handle logout buttons for different roles
    const logoutButtons = ['clientLogoutBtn', 'moderatorLogoutBtn', 'adminLogoutBtn'];
    
    logoutButtons.forEach(buttonId => {
        const logoutBtn = document.getElementById(buttonId);
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async function() {
                if (window.Clerk) {
                    try {
                        await window.Clerk.signOut();
                        // Hide all dashboards and show auth container
                        const dashboards = ['client-dashboard', 'moderator-dashboard', 'admin-dashboard'];
                        dashboards.forEach(id => {
                            const dashboard = document.getElementById(id);
                            if (dashboard) dashboard.style.display = 'none';
                        });
                        const authContainer = document.getElementById('clerk-auth-container');
                        if (authContainer) authContainer.classList.add('show');
                        showNotification('Déconnexion réussie', 'success');
                    } catch (error) {
                        console.error('Error signing out:', error);
                        showNotification('Erreur lors de la déconnexion', 'error');
                    }
                }
            });
        }
    });
    
    // Sidebar Navigation
    initializeSidebarNavigation();
    
    // Script Documentation Selector
    initializeScriptSelector();
});

// ===================================================================
// SCRIPT DOCUMENTATION SELECTOR - Custom Dropdown
// ===================================================================
function initializeScriptSelector() {
    // Custom dropdown elements
    const customDropdown = document.getElementById('customDropdown');
    const dropdownToggle = document.getElementById('dropdownToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownLabel = dropdownToggle?.querySelector('.dropdown-label');
    const dropdownItems = dropdownMenu?.querySelectorAll('.dropdown-item');
    
    // PDF viewer elements
    const pdfViewer = document.getElementById('pdf-viewer');
    const selectMessage = document.querySelector('.select-script-message');
    const downloadBtn = document.getElementById('download-doc-btn');
    let currentFileId = '';
    let selectedItem = null;
    
    if (!customDropdown || !dropdownToggle || !dropdownMenu || !pdfViewer) return;
    
    // Toggle dropdown
    dropdownToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = dropdownMenu.classList.contains('active');
        
        if (isOpen) {
            dropdownMenu.classList.remove('active');
            dropdownToggle.setAttribute('aria-expanded', 'false');
        } else {
            dropdownMenu.classList.add('active');
            dropdownToggle.setAttribute('aria-expanded', 'true');
        }
    });
    
    // Handle dropdown item selection
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const googleDriveFileId = this.getAttribute('data-value');
            const scriptName = this.textContent;
            currentFileId = googleDriveFileId;
            
            // Update selected state
            dropdownItems.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            selectedItem = this;
            
            // Update dropdown label
            if (dropdownLabel) {
                dropdownLabel.textContent = scriptName;
            }
            
            // Close dropdown
            dropdownMenu.classList.remove('active');
            dropdownToggle.setAttribute('aria-expanded', 'false');
            
            // Handle PDF display
            if (googleDriveFileId) {
                // Hide the select message
                if (selectMessage) {
                    selectMessage.style.display = 'none';
                }
                
                // Show the PDF viewer and download button
                pdfViewer.style.display = 'block';
                if (downloadBtn) {
                    downloadBtn.style.display = 'flex';
                }
                
                // Construct Google Drive preview URL
                const googleDriveUrl = `https://drive.google.com/file/d/${googleDriveFileId}/preview`;
                pdfViewer.src = googleDriveUrl;
            } else {
                // Show the select message
                if (selectMessage) {
                    selectMessage.style.display = 'block';
                }
                
                // Hide the PDF viewer and download button
                pdfViewer.style.display = 'none';
                pdfViewer.src = '';
                if (downloadBtn) {
                    downloadBtn.style.display = 'none';
                }
            }
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!customDropdown.contains(e.target)) {
            dropdownMenu.classList.remove('active');
            dropdownToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close dropdown on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dropdownMenu.classList.contains('active')) {
            dropdownMenu.classList.remove('active');
            dropdownToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Handle download button click
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            if (currentFileId) {
                // Construct Google Drive download URL
                const downloadUrl = `https://drive.google.com/uc?export=download&id=${currentFileId}`;
                
                // Open download in new tab
                window.open(downloadUrl, '_blank');
            }
        });
    }
}

// ===================================================================
// SIDEBAR NAVIGATION SYSTEM
// ===================================================================
function initializeSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const contentSections = document.querySelectorAll('.content-section');
    const sidebar = document.getElementById('clientSidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    // Handle sidebar link clicks
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Show selected content section
            const sectionName = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionName + '-section');
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Handle sidebar toggle
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            // Update toggle icon
            const icon = this.querySelector('span');
            if (sidebar.classList.contains('collapsed')) {
                icon.textContent = '☰';
            } else {
                icon.textContent = '☰';
            }
        });
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
        }
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.features, .cta, .leveling-section, .proxy-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add fadeInUp animation
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Initialize falling particles
    initializeParticles();
});

// ===================================================================
// FALLING PARTICLES EFFECT
// ===================================================================
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    
    if (!particlesContainer) return;
    
    // Create 30 particles
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random horizontal position
    const randomX = Math.random() * 100;
    particle.style.left = `${randomX}%`;
    
    // Random size between 4px and 10px
    const size = Math.random() * 6 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random animation duration between 10s and 20s
    const duration = Math.random() * 10 + 10;
    particle.style.animationDuration = `${duration}s`;
    
    // Start each particle at a random point in its animation cycle for immediate visibility
    const delay = -(Math.random() * duration);
    particle.style.animationDelay = `${delay}s`;
    
    // Random horizontal drift
    const drift = (Math.random() - 0.5) * 100;
    particle.style.setProperty('--drift', `${drift}px`);
    
    container.appendChild(particle);
    
    // Recreate particle after animation completes
    particle.addEventListener('animationiteration', () => {
        particle.style.left = `${Math.random() * 100}%`;
    });
}

// ===================================================================
// TICKETING & CHAT SYSTEM - SUPABASE INTEGRATION
// ===================================================================

// Supabase Configuration
const SUPABASE_URL = 'https://ndniosrqgrzcsqnfabxr.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbmlvc3JxZ3J6Y3NxbmZhYnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NjEyNTAsImV4cCI6MjA4NTEzNzI1MH0.vu7GRZ-C-qdhPT8niHVOgz3E1Sxhv5hewi-GDSGR01w'; // Replace with your Supabase anon key

// Initialize Supabase client
let supabaseClient = null;
let currentUser = null;
let currentUserRole = null;
let currentTicketId = null;
let chatChannel = null;
let ticketsChannel = null; // For real-time ticket updates
let isInitialized = false; // Flag to prevent duplicate initialization

// Initialize ticketing system
async function initializeTicketingSystem() {
    // Prevent duplicate initialization
    if (isInitialized) {
        console.log('✅ Ticketing system already initialized, skipping...');
        return;
    }

    try {
        console.log('🚀 Initializing ticketing system...');

        // Initialize Supabase client only once
        if (!supabaseClient) {
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('✅ Supabase client initialized');
        } else {
            console.log('✅ Supabase client already initialized');
        }

        // Check if user is authenticated with Clerk
        if (!window.Clerk || !window.Clerk.user || !window.Clerk.user.id) {
            console.log('❌ User not authenticated');
            return;
        }

        currentUser = window.Clerk.user;
        console.log('✅ User authenticated:', currentUser);

        await loadUserRole();
        console.log('✅ User role loaded:', currentUserRole);

        await initializeUI();
        console.log('✅ UI initialized');

        await loadTickets();
        console.log('✅ Tickets loaded');

        // Subscribe to real-time ticket updates
        subscribeToTicketUpdates();
        console.log('✅ Subscribed to ticket updates');

        // Mark as initialized
        isInitialized = true;
        console.log('✅ Ticketing system initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing ticketing system:', error);
        showNotification('Erreur lors de l\'initialisation du système', 'error');
    }
}

// Set user context for RLS policies (simplified)
async function setUserContext(clerkId) {
    // This is now optional - our RLS policies work with the current setup
    try {
        await supabaseClient.rpc('set_user_context', {
            user_clerk_id: clerkId
        });
    } catch (error) {
        // Ignore errors - RLS still works without this
    }
}

// Load user role from database
async function loadUserRole() {
    try {
        console.log('👤 Loading user role for:', currentUser.id);

        const { data: userData, error } = await supabaseClient
            .from('users')
            .select('role')
            .eq('clerk_id', currentUser.id)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
            console.error('👤 Error loading user role:', error);
            throw error;
        }

        if (userData) {
            currentUserRole = userData.role;
            console.log('👤 User role loaded from DB:', currentUserRole);
        } else {
            console.log('👤 User not found in DB, creating new user record');
            // Create new user record
            const { data: newUser, error: insertError } = await supabaseClient
                .from('users')
                .insert([{
                    clerk_id: currentUser.id,
                    email: currentUser.emailAddresses[0]?.emailAddress,
                    name: currentUser.firstName || currentUser.username,
                    role: 'client' // Default role
                }])
                .select()
                .single();

            if (insertError) {
                console.error('👤 Error creating user:', insertError);
                throw insertError;
            }
            currentUserRole = newUser.role;
            console.log('👤 New user created with role:', currentUserRole);
        }

        console.log('✅ Final user role:', currentUserRole);
    } catch (error) {
        console.error('❌ Error in loadUserRole:', error);
        currentUserRole = 'client'; // Fallback
    }
}

// Initialize UI based on user role
async function initializeUI() {
    console.log('🎨 Initializing UI for role:', currentUserRole);
    console.log('🎨 Current user:', currentUser);

    // Update user name in the dashboard
    const displayName = currentUser.firstName ||
                      currentUser.username ||
                      currentUser.emailAddresses[0]?.emailAddress.split('@')[0] ||
                      'Joueur';

    const clientNameElement = document.getElementById('clientName');
    if (clientNameElement) {
        clientNameElement.textContent = displayName;
        console.log('✅ User name updated to:', displayName);
    } else {
        console.log('❌ clientName element not found');
    }

    const clientDashboard = document.getElementById('client-dashboard');
    const moderatorDashboard = document.getElementById('moderator-dashboard');
    const adminDashboard = document.getElementById('admin-dashboard');

    console.log('🎨 Dashboard elements found:', {
        client: !!clientDashboard,
        moderator: !!moderatorDashboard,
        admin: !!adminDashboard
    });

    // Hide all dashboards first
    [clientDashboard, moderatorDashboard, adminDashboard].forEach(dashboard => {
        if (dashboard) {
            dashboard.style.display = 'none';
            console.log('✅ Dashboard hidden:', dashboard.id);
        } else {
            console.log('❌ Dashboard not found for hiding');
        }
    });

    // Show appropriate dashboard
    switch (currentUserRole) {
        case 'client':
            if (clientDashboard) {
                clientDashboard.style.display = 'block';
                console.log('✅ Client dashboard shown');
                initializeClientUI();
            } else {
                console.log('❌ Client dashboard element not found');
            }
            break;
        case 'moderator':
            if (moderatorDashboard) {
                moderatorDashboard.style.display = 'block';
                console.log('✅ Moderator dashboard shown');
                initializeModeratorUI();
            } else {
                console.log('❌ Moderator dashboard element not found');
            }
            break;
        case 'admin':
            if (adminDashboard) {
                adminDashboard.style.display = 'block';
                console.log('✅ Admin dashboard shown');
                initializeAdminUI();
            } else {
                console.log('❌ Admin dashboard element not found');
            }
            break;
        default:
            console.log('❌ Unknown role:', currentUserRole);
    }

    // Initialize common UI elements
    initializeModalHandlers();
    initializeAvailabilityToggle();
    initializeFilterControls();
    console.log('✅ Modal handlers, availability toggle, and filter controls initialized');
}

// Initialize moderator-specific UI
function initializeModeratorUI() {
    console.log('🎭 Initializing moderator UI...');
    // Load moderator stats
    loadModeratorStats();
    // Initialize search functionality
    initializeSearch();
    // Update role display
    updateUserRoleDisplay();
    console.log('✅ Moderator UI initialized');
}

// Initialize client-specific UI
function initializeClientUI() {
    console.log('👤 Initializing client UI...');
    // Load client stats
    loadClientStats();
    // Initialize search functionality
    initializeSearch();
    // Update role display
    updateUserRoleDisplay();
    console.log('✅ Client UI initialized');
}

// Initialize admin-specific UI
function initializeAdminUI() {
    console.log('👑 Initializing admin UI...');
    // Load admin stats and user management
    loadAdminStats();
    loadUsersList();
    initializeAdminFilters();

    // Refresh stats when window regains focus (in case moderators changed availability)
    window.addEventListener('focus', () => {
        if (currentUserRole === 'admin') {
            console.log('👑 Window focused, refreshing admin stats...');
            loadAdminStats();
        }
    });

    console.log('✅ Admin UI initialized');
}

// Initialize admin filters
function initializeAdminFilters() {
    const statusFilter = document.getElementById('statusFilter');
    const moderatorFilter = document.getElementById('moderatorFilter');

    if (statusFilter) {
        // Ensure default value is set
        statusFilter.value = 'all';
        statusFilter.addEventListener('change', () => loadTickets());
    }

    if (moderatorFilter) {
        // Ensure default value is set
        moderatorFilter.value = 'all';
        // Load available moderators for filter dropdown
        loadAvailableModerators().then(moderators => {
            moderatorFilter.innerHTML = '<option value="all">Tous les modérateurs</option>';
            moderators.forEach(moderator => {
                const option = document.createElement('option');
                option.value = moderator.clerk_id;
                option.textContent = moderator.name;
                moderatorFilter.appendChild(option);
            });
        });

        moderatorFilter.addEventListener('change', () => loadTickets());
    }

    // Load tickets after filters are initialized
    setTimeout(() => loadTickets(), 100);
}

// Load tickets based on user role
async function loadTickets() {
    try {
        console.log('🎫 Loading tickets for role:', currentUserRole);

        let tickets = null;
        let error = null;

        if (currentUserRole === 'client') {
            // Clients see only their own tickets
            const query = supabaseClient.from('tickets').select(`
                *,
                messages (
                    id,
                    content,
                    sender_type,
                    sender_name,
                    created_at
                )
            `).eq('client_id', currentUser.id);

            console.log('🎫 Client query - filtering by client_id:', currentUser.id);

            const result = await query.order('created_at', { ascending: false });
            tickets = result.data;
            error = result.error;

            console.log('🎫 Client tickets loaded:', tickets?.length || 0, 'tickets');
            if (tickets) {
                tickets.forEach(ticket => {
                    console.log('🎫 Client ticket:', ticket.id, ticket.title, 'client_id:', ticket.client_id);
                });
            }
        } else if (currentUserRole === 'moderator') {
            // Moderators should see: tickets assigned to them OR open tickets (unassigned)
            console.log('🎫 Filtering for moderator:', currentUser.id);

            // First, get tickets assigned to this moderator
            const assignedQuery = supabaseClient.from('tickets').select(`
                *,
                messages (
                    id,
                    content,
                    sender_type,
                    sender_name,
                    created_at
                )
            `).eq('assigned_to', currentUser.id);

            // Then, get open tickets that are not assigned to anyone
            const openQuery = supabaseClient.from('tickets').select(`
                *,
                messages (
                    id,
                    content,
                    sender_type,
                    sender_name,
                    created_at
                )
            `).eq('status', 'open').is('assigned_to', null);

            // Execute both queries
            const [assignedResult, openResult] = await Promise.all([
                assignedQuery,
                openQuery
            ]);

            if (assignedResult.error) {
                console.error('🎫 Error loading assigned tickets:', assignedResult.error);
            }
            if (openResult.error) {
                console.error('🎫 Error loading open tickets:', openResult.error);
            }

            // Combine results and remove duplicates
            const assignedTickets = assignedResult.data || [];
            const openTickets = openResult.data || [];
            const allTickets = [...assignedTickets, ...openTickets];

            // Remove duplicates (in case a ticket is both assigned to moderator and open)
            const uniqueTickets = allTickets.filter((ticket, index, self) =>
                index === self.findIndex(t => t.id === ticket.id)
            );

            console.log('🎫 Moderator tickets - assigned:', assignedTickets.length, 'open:', openTickets.length, 'total unique:', uniqueTickets.length);

            // Sort by creation date (newest first)
            uniqueTickets.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            tickets = uniqueTickets;
            error = null;
        } else if (currentUserRole === 'admin') {
            // Admin sees all tickets (with optional filters)
            let query = supabaseClient.from('tickets').select(`
                *,
                messages (
                    id,
                    content,
                    sender_type,
                    sender_name,
                    created_at
                )
            `);

            const statusFilter = document.getElementById('statusFilter');
            const moderatorFilter = document.getElementById('moderatorFilter');

            console.log('🎫 Admin filters - status:', statusFilter?.value, 'moderator:', moderatorFilter?.value);

            if (statusFilter && statusFilter.value && statusFilter.value !== 'all') {
                query = query.eq('status', statusFilter.value);
                console.log('🎫 Applying status filter:', statusFilter.value);
            }

            if (moderatorFilter && moderatorFilter.value && moderatorFilter.value !== 'all') {
                query = query.eq('assigned_to', moderatorFilter.value);
                console.log('🎫 Applying moderator filter:', moderatorFilter.value);
            }

            const result = await query.order('created_at', { ascending: false });
            tickets = result.data;
            error = result.error;

            console.log('🎫 Admin loading all tickets');
        }

        if (error) {
            console.error('🎫 Error loading tickets:', error);
            throw error;
        }

        console.log('🎫 Loaded', tickets?.length || 0, 'tickets');
        displayTickets(tickets);
    } catch (error) {
        console.error('❌ Error loading tickets:', error);
        showNotification('Erreur lors du chargement des tickets', 'error');
    }
}

// Display tickets in the UI
function displayTickets(tickets) {
    // Determine which table body to use based on current user role
    let tableBodyId;
    switch (currentUserRole) {
        case 'client':
            tableBodyId = 'ticketsTableBody';
            break;
        case 'moderator':
            tableBodyId = 'moderatorTicketsTableBody';
            break;
        case 'admin':
            tableBodyId = 'adminTicketsTableBody';
            break;
        default:
            tableBodyId = 'ticketsTableBody';
    }

    const ticketsTableBody = document.getElementById(tableBodyId);
    if (!ticketsTableBody) {
        console.error('❌ Tickets table body not found:', tableBodyId);
        return;
    }

    console.log('🎫 Displaying', tickets?.length || 0, 'tickets in table:', tableBodyId, 'for role:', currentUserRole);
    ticketsTableBody.innerHTML = '';

    if (!tickets || tickets.length === 0) {
        console.log('🎫 No tickets to display');
        ticketsTableBody.innerHTML = `
            <tr>
                <td colspan="7" class="px-6 py-12 text-center">
                    <div class="text-slate-500 dark:text-slate-400">
                        <span class="material-icons-round text-4xl mb-2 block">inbox</span>
                        <p class="text-lg font-medium">Aucun ticket trouvé</p>
                        <p class="text-sm">Vous n'avez pas encore de tickets.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tickets.forEach((ticket, index) => {
        console.log('🎫 Creating row for ticket', index + 1, ':', ticket.id, ticket.title);
        const ticketRow = createTicketCard(ticket);
        ticketsTableBody.appendChild(ticketRow);
    });
}

// Create ticket card element (now creates table rows)
function createTicketCard(ticket) {
    const row = document.createElement('tr');
    row.className = 'hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors';
    row.onclick = () => openTicketChat(ticket.id);

    const statusClass = ticket.status.toLowerCase().replace(' ', '-');
    const statusColors = {
        'open': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        'in-progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        'closed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        'escalated': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };

    const priorityColors = {
        'low': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
        'normal': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        'high': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        'urgent': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };

    const lastMessage = ticket.messages?.[ticket.messages.length - 1];
    const lastActivity = lastMessage ? new Date(lastMessage.created_at).toLocaleString('fr-FR') : 'Aucune activité';

    let actionsHtml = '';

    if (currentUserRole === 'admin') {
        // Admin can assign, close, or escalate tickets
        actionsHtml = `
            <div class="flex items-center space-x-2">
                <select class="assign-select px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white" data-ticket-id="${ticket.id}">
                    <option value="">Assigner à...</option>
                    <!-- Moderators will be loaded here -->
                </select>
                ${ticket.status !== 'closed' ? `<button class="action-btn px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition-colors" data-ticket-id="${ticket.id}" data-action="closed">Fermer</button>` : ''}
                ${ticket.status !== 'escalated' ? `<button class="action-btn px-3 py-1 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors" data-ticket-id="${ticket.id}" data-action="escalated">Escalader</button>` : ''}
            </div>
        `;
    } else if (currentUserRole === 'moderator') {
        // Moderator actions
        actionsHtml = `
            <div class="flex items-center space-x-2">
                ${ticket.status !== 'closed' ? `<button class="action-btn px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition-colors" data-ticket-id="${ticket.id}" data-action="closed">Fermer</button>` : ''}
                ${ticket.status === 'open' ? `<button class="action-btn px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors" data-ticket-id="${ticket.id}" data-action="in-progress">Prendre</button>` : ''}
                ${ticket.status !== 'escalated' ? `<button class="action-btn px-3 py-1 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors" data-ticket-id="${ticket.id}" data-action="escalated">Escalader</button>` : ''}
            </div>
        `;
    }

    row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">#${ticket.id}</td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-slate-900 dark:text-white">${ticket.title}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[ticket.status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'}">${ticket.status}</span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[ticket.priority] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'}">${ticket.priority}</span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">${ticket.assigned_to_name || 'Non assigné'}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">${ticket.client_name || 'Client inconnu'}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">${new Date(ticket.created_at).toLocaleDateString('fr-FR')}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" onclick="event.stopPropagation()">${actionsHtml}</td>
    `;

    // Add event listeners to action buttons to prevent row click
    const actionButtons = row.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent the row click from firing
            const ticketId = this.getAttribute('data-ticket-id');
            const action = this.getAttribute('data-action');
            updateTicketStatus(ticketId, action);
        });
    });

    // Handle assignment dropdown
    const assignSelect = row.querySelector('.assign-select');
    if (assignSelect) {
        // Prevent click events on the dropdown from bubbling to the row
        assignSelect.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        assignSelect.addEventListener('change', function(e) {
            e.stopPropagation(); // Prevent the row click from firing
            const ticketId = this.getAttribute('data-ticket-id');
            const moderatorId = this.value;
            if (moderatorId) {
                assignTicket(ticketId, moderatorId);
            }
        });

        // Load moderators for admin assignment dropdown
        loadAvailableModerators().then(moderators => {
            moderators.forEach(moderator => {
                const option = document.createElement('option');
                option.value = moderator.clerk_id;
                option.textContent = `${moderator.name} ${moderator.available ? '(Disponible)' : '(Occupé)'}`;
                assignSelect.appendChild(option);
            });
        }).catch(error => {
            console.error('Error loading moderators for assignment:', error);
        });
    }

    return row;
}

// Create new ticket
async function createTicket() {
    const problemType = document.getElementById('problemType').value;
    const description = document.getElementById('ticketDescription').value.trim();

    if (!problemType || !description) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }

    // Create title from problem type
    const title = `Support: ${problemType}`;

    console.log('🎫 Creating ticket for user:', currentUser.id, 'role:', currentUserRole);

    try {
        const ticketData = {
            title,
            description,
            priority: 'normal', // Default priority
            status: 'open',
            client_id: currentUser.id,
            client_name: currentUser.firstName || currentUser.username || 'Client'
        };

        console.log('🎫 Ticket data:', ticketData);

        const { data: ticket, error } = await supabaseClient
            .from('tickets')
            .insert([ticketData])
            .select()
            .single();

        if (error) {
            console.error('🎫 Error creating ticket:', error);
            throw error;
        }

        console.log('🎫 Ticket created successfully:', ticket);
        showNotification('Ticket créé avec succès', 'success');
        closeModal('ticketModal');
        document.getElementById('ticketForm').reset();
        await loadTickets();
    } catch (error) {
        console.error('❌ Error creating ticket:', error);
        showNotification('Erreur lors de la création du ticket', 'error');
    }
}

// Update ticket status
async function updateTicketStatus(ticketId, newStatus) {
    try {
        const updateData = { status: newStatus };

        if (newStatus === 'in-progress' && currentUserRole === 'moderator') {
            updateData.assigned_to = currentUser.id;
            updateData.assigned_to_name = currentUser.firstName || currentUser.username;
        }

        const { error } = await supabaseClient
            .from('tickets')
            .update(updateData)
            .eq('id', ticketId);

        if (error) throw error;

        showNotification(`Ticket ${newStatus === 'closed' ? 'fermé' : newStatus === 'in-progress' ? 'pris en charge' : 'escaladé'}`, 'success');
        await loadTickets();
    } catch (error) {
        console.error('Error updating ticket status:', error);
        showNotification('Erreur lors de la mise à jour du ticket', 'error');
    }
}

// Assign ticket to moderator
async function assignTicket(ticketId, moderatorId) {
    if (!moderatorId) return; // No moderator selected

    try {
        // Get moderator details
        const { data: moderator, error: modError } = await supabaseClient
            .from('users')
            .select('name')
            .eq('clerk_id', moderatorId)
            .single();

        if (modError) throw modError;

        // Update ticket assignment
        const { error } = await supabaseClient
            .from('tickets')
            .update({
                assigned_to: moderatorId,
                assigned_to_name: moderator.name,
                status: 'in-progress' // Automatically set to in-progress when assigned
            })
            .eq('id', ticketId);

        if (error) throw error;

        showNotification(`Ticket assigné à ${moderator.name}`, 'success');
        await loadTickets();
    } catch (error) {
        console.error('Error assigning ticket:', error);
        showNotification('Erreur lors de l\'assignation du ticket', 'error');
    }
}

// Open ticket chat modal
async function openTicketChat(ticketId) {
    try {
        const { data: ticket, error } = await supabaseClient
            .from('tickets')
            .select(`
                *,
                messages (
                    id,
                    content,
                    sender_type,
                    sender_name,
                    created_at
                )
            `)
            .eq('id', ticketId)
            .single();

        if (error) throw error;

        currentTicketId = ticketId;

        // Update modal content
        document.getElementById('chat-ticket-title').textContent = ticket.title;
        document.getElementById('chat-ticket-status').textContent = ticket.status;
        document.getElementById('chat-ticket-status').className = `ticket-status ${ticket.status.toLowerCase().replace(' ', '-')}`;

        // Display messages
        displayChatMessages(ticket.messages || []);

        // Subscribe to real-time updates for this ticket
        subscribeToTicketMessages(ticketId);

        // Show modal
        openModal('chat-modal');
    } catch (error) {
        console.error('Error opening ticket chat:', error);
        showNotification('Erreur lors de l\'ouverture du chat', 'error');
    }
}

// Display chat messages
function displayChatMessages(messages) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    messagesContainer.innerHTML = '';

    if (messages.length === 0) {
        messagesContainer.innerHTML = `
            <div class="empty-state">
                <div class="text-center py-12">
                    <div class="text-6xl mb-4">💬</div>
                    <h4 class="text-lg font-medium text-slate-800 dark:text-white mb-2">Aucun message</h4>
                    <p class="text-slate-600 dark:text-slate-400">Commencez la conversation en envoyant un message ci-dessous.</p>
                </div>
            </div>
        `;
        return;
    }

    messages.forEach(message => {
        const messageElement = createMessageElement(message);
        messagesContainer.appendChild(messageElement);
    });

    // Scroll to bottom with smooth animation
    setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
}

// Create message element
function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-bubble';

    const messageTime = new Date(message.created_at);
    const timeString = messageTime.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    // Get role-specific icon and styling
    const roleConfig = getRoleConfig(message.sender_type);

    // Determine if this message should be right-aligned (admin messages are always right-aligned)
    const isRightAligned = message.sender_type === 'admin' || message.sender_type === currentUserRole;

    if (isRightAligned) {
        // Right-aligned bubble for admin messages and current user
        messageDiv.className = 'message-bubble user';
        const avatarHtml = message.sender_avatar
            ? `<img src="${message.sender_avatar}" alt="Avatar" class="w-6 h-6 rounded-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />`
            : `<div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"><span class="text-xs">${roleConfig.icon}</span></div>`;

        messageDiv.innerHTML = `
            <div class="flex items-end space-x-2">
                <div class="flex-1"></div>
                <div class="bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs shadow-lg">
                    <p class="text-sm">${message.content}</p>
                </div>
                ${avatarHtml}
            </div>
            <div class="text-right text-xs text-gray-500 mt-1">${timeString}</div>
        `;
    } else {
        // Left-aligned bubble for others
        messageDiv.className = 'message-bubble other';
        const bubbleClass = 'bg-white border border-gray-200 text-gray-900';
        const avatarHtml = message.sender_avatar
            ? `<img src="${message.sender_avatar}" alt="Avatar" class="w-6 h-6 rounded-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />`
            : `<div class="w-6 h-6 ${roleConfig.bgColor} rounded-full flex items-center justify-center flex-shrink-0"><span class="text-xs">${roleConfig.icon}</span></div>`;

        messageDiv.innerHTML = `
            <div class="flex items-end space-x-2">
                ${avatarHtml}
                <div class="${bubbleClass} px-4 py-2 rounded-2xl rounded-bl-md max-w-xs shadow-sm">
                    <p class="text-sm">${message.content}</p>
                </div>
            </div>
            <div class="text-left text-xs text-gray-500 mt-1 ml-8">${timeString}</div>
        `;
    }

    return messageDiv;
}

// Get role configuration for styling
function getRoleConfig(role) {
    const configs = {
        client: {
            icon: '👤',
            label: 'Client',
            color: '#6366f1',
            bgColor: 'bg-blue-100'
        },
        moderator: {
            icon: '🛡️',
            label: 'Modérateur',
            color: '#f59e0b',
            bgColor: 'bg-orange-100'
        },
        admin: {
            icon: '👑',
            label: 'Admin',
            color: '#ef4444',
            bgColor: 'bg-red-100'
        }
    };
    return configs[role] || configs.client;
}

// Show typing indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    // Remove existing typing indicator
    const existingTyping = messagesContainer.querySelector('.typing-indicator');
    if (existingTyping) return;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'message-bubble other typing-indicator';

    typingDiv.innerHTML = `
        <div class="flex items-end space-x-2">
            <div class="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-xs">🛡️</span>
            </div>
            <div class="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;

    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    const typingIndicator = messagesContainer.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Show message details on hover/click
function showMessageDetails(messageId, timestamp, senderType) {
    // For now, just show a tooltip-like notification
    const roleConfig = getRoleConfig(senderType);
    showNotification(`Message de ${roleConfig.label} - ${timestamp}`, 'info');
}

// Send message
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const content = messageInput.value.trim();
    const maxLength = 1000;

    if (!content || !currentTicketId) return;

    // Check character limit
    if (content.length > maxLength) {
        showNotification(`Message trop long (${content.length}/${maxLength})`, 'error');
        return;
    }

    // Disable input and send button while sending
    const sendBtn = document.getElementById('sendBtn');
    messageInput.disabled = true;
    if (sendBtn) sendBtn.disabled = true;

    try {
        const { error } = await supabaseClient
            .from('messages')
            .insert([{
                ticket_id: currentTicketId,
                content,
                sender_type: currentUserRole,
                sender_name: currentUser.firstName || currentUser.username || 'Utilisateur',
                sender_id: currentUser.id,
                sender_avatar: currentUser.imageUrl // Discord avatar URL
            }]);

        if (error) throw error;

        // Clear input and reset height
        messageInput.value = '';
        messageInput.style.height = 'auto';
        updateCharacterCounter();

        // Messages will be updated via real-time subscription
    } catch (error) {
        console.error('Error sending message:', error);
        showNotification('Erreur lors de l\'envoi du message', 'error');
    } finally {
        // Re-enable input and send button
        messageInput.disabled = false;
        if (sendBtn) sendBtn.disabled = false;
        messageInput.focus();
    }
}

// Show typing indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    // Remove existing typing indicator
    const existingTyping = messagesContainer.querySelector('.typing-indicator');
    if (existingTyping) return;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'message-bubble other typing-indicator';

    typingDiv.innerHTML = `
        <div class="flex items-end space-x-2">
            <div class="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-xs">🛡️</span>
            </div>
            <div class="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;

    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    const typingIndicator = messagesContainer.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Character counter for message input
function updateCharacterCounter() {
    const messageInput = document.getElementById('messageInput');
    const charCounter = document.getElementById('charCounter');
    const maxLength = 1000;

    if (!messageInput || !charCounter) return;

    const currentLength = messageInput.value.length;
    charCounter.textContent = `${currentLength}/${maxLength}`;

    // Update styling based on character count
    charCounter.classList.remove('warning', 'danger');

    if (currentLength > maxLength * 0.8) {
        charCounter.classList.add('warning');
    }

    if (currentLength > maxLength * 0.9) {
        charCounter.classList.add('danger');
    }

    // Disable send button if over limit
    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) {
        sendBtn.disabled = currentLength > maxLength;
    }
}

// Auto-resize textarea based on content
function autoResizeTextarea() {
    const messageInput = document.getElementById('messageInput');
    if (!messageInput) return;

    // Reset height to auto to get the correct scrollHeight
    messageInput.style.height = 'auto';

    // Set the height to the scrollHeight
    const scrollHeight = messageInput.scrollHeight;
    const minHeight = 48; // Minimum height
    const maxHeight = 120; // Maximum height

    const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
    messageInput.style.height = newHeight + 'px';
}

// Handle file upload
function handleFileUpload(files) {
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            showNotification(`Le fichier ${file.name} est trop volumineux (max 10MB)`, 'error');
            return;
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            showNotification(`Type de fichier non supporté: ${file.name}`, 'error');
            return;
        }

        // For now, just show a notification (file upload would need backend implementation)
        showNotification(`Fichier "${file.name}" sélectionné. L'upload de fichiers sera bientôt disponible.`, 'info');

        // TODO: Implement actual file upload to Supabase Storage
        // This would involve:
        // 1. Upload file to Supabase Storage
        // 2. Get public URL
        // 3. Send message with file attachment
        // 4. Display file preview in chat
    });

    // Clear the file input
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.value = '';
    }
}

// Subscribe to real-time ticket updates (for all users)
function subscribeToTicketUpdates() {
    // Unsubscribe from previous channel
    if (ticketsChannel) {
        supabaseClient.removeChannel(ticketsChannel);
    }

    ticketsChannel = supabaseClient
        .channel('tickets-updates')
        .on('postgres_changes', {
            event: '*', // Listen to INSERT, UPDATE, DELETE
            schema: 'public',
            table: 'tickets'
        }, (payload) => {
            console.log('🎫 Real-time ticket update:', payload.eventType, payload.new || payload.old);

            // Check if this ticket update affects the current user's view
            const shouldReload = checkIfTicketAffectsCurrentUser(payload);

            if (shouldReload) {
                console.log('🎫 Ticket update affects current user, reloading tickets...');
                loadTickets();
            }
        })
        .subscribe();
}

// Subscribe to real-time messages for a specific ticket
function subscribeToTicketMessages(ticketId) {
    // Unsubscribe from previous chat channel
    if (chatChannel) {
        supabaseClient.removeChannel(chatChannel);
    }

    chatChannel = supabaseClient
        .channel(`ticket-messages-${ticketId}`)
        .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `ticket_id=eq.${ticketId}`
        }, (payload) => {
            console.log('💬 New message received:', payload.new);

            // Add the new message to the chat
            const messageElement = createMessageElement(payload.new);
            const messagesContainer = document.getElementById('chat-messages');
            if (messagesContainer) {
                messagesContainer.appendChild(messageElement);

                // Scroll to bottom
                setTimeout(() => {
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }, 100);
            }

            // Hide typing indicator if it was showing
            hideTypingIndicator();
        })
        .subscribe();
}

// Check if a ticket update should trigger a reload for the current user
function checkIfTicketAffectsCurrentUser(payload) {
    const ticket = payload.new || payload.old;

    if (!ticket || !currentUser) return false;

    if (currentUserRole === 'client') {
        // Clients only care about their own tickets
        return ticket.client_id === currentUser.id;
    } else if (currentUserRole === 'moderator') {
        // Moderators care about:
        // - Tickets assigned to them
        // - Open tickets (unassigned)
        // - Tickets that were assigned to them but are no longer
        if (payload.eventType === 'INSERT') {
            return ticket.status === 'open' && !ticket.assigned_to;
        } else if (payload.eventType === 'UPDATE') {
            const oldTicket = payload.old;
            // If assignment changed to/from this moderator
            if (oldTicket.assigned_to !== ticket.assigned_to) {
                return oldTicket.assigned_to === currentUser.id || ticket.assigned_to === currentUser.id;
            }
            // If status changed from open to assigned
            if (oldTicket.status === 'open' && ticket.status !== 'open' && ticket.assigned_to === currentUser.id) {
                return true;
            }
            // If ticket was assigned to this moderator
            return ticket.assigned_to === currentUser.id;
        } else if (payload.eventType === 'DELETE') {
            // If a ticket assigned to this moderator was deleted
            return ticket.assigned_to === currentUser.id;
        }
    } else if (currentUserRole === 'admin') {
        // Admins care about all ticket changes
        return true;
    }

    return false;
}

// Initialize filter controls
function initializeFilterControls() {
    // Get filter buttons based on current role
    let filterButtons;
    switch (currentUserRole) {
        case 'client':
            filterButtons = document.querySelectorAll('#client-dashboard .segmented-control-item');
            break;
        case 'moderator':
            filterButtons = document.querySelectorAll('#moderator-dashboard .segmented-control-item');
            break;
        case 'admin':
            // Admin uses different filter system (statusFilter and moderatorFilter dropdowns)
            initializeAdminFilters();
            return;
        default:
            filterButtons = document.querySelectorAll('.segmented-control-item');
    }

    if (filterButtons.length === 0) return;

    console.log('🎛️ Initializing filter controls for role:', currentUserRole, 'found', filterButtons.length, 'buttons');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('segmented-control-item-active');
                btn.classList.add('segmented-control-item-inactive');
            });
            this.classList.remove('segmented-control-item-inactive');
            this.classList.add('segmented-control-item-active');

            // Apply filter
            applyTicketFilter(filterValue);
        });
    });

    console.log('✅ Filter controls initialized');
}

// Apply ticket filter
// Apply ticket filter
function applyTicketFilter(filterValue) {
    // Determine which table body to filter based on current role
    let tableBodyId;
    switch (currentUserRole) {
        case 'client':
            tableBodyId = 'ticketsTableBody';
            break;
        case 'moderator':
            tableBodyId = 'moderatorTicketsTableBody';
            break;
        case 'admin':
            tableBodyId = 'adminTicketsTableBody';
            break;
        default:
            tableBodyId = 'ticketsTableBody';
    }

    const tableBody = document.getElementById(tableBodyId);
    if (!tableBody) {
        console.error('❌ Table body not found for filtering:', tableBodyId);
        return;
    }

    const rows = tableBody.querySelectorAll('tr');
    if (rows.length === 0) return;

    console.log('🎛️ Applying filter:', filterValue, 'to table:', tableBodyId);

    rows.forEach(row => {
        if (row.classList.contains('empty-state')) return; // Skip empty state row

        if (filterValue === 'all') {
            row.style.display = '';
        } else {
            const statusCell = row.querySelector('td:nth-child(3) span');
            if (statusCell) {
                const statusText = statusCell.textContent.toLowerCase().trim();
                const shouldShow = statusText === filterValue ||
                                 (filterValue === 'open' && statusText === 'ouvert') ||
                                 (filterValue === 'in-progress' && statusText === 'en cours') ||
                                 (filterValue === 'closed' && statusText === 'fermé');
                row.style.display = shouldShow ? '' : 'none';
            }
        }
    });
}

// Load client statistics
async function loadClientStats() {
    try {
        console.log('📊 Loading client stats for user:', currentUser.id, 'role:', currentUserRole);

        if (currentUserRole !== 'client') {
            console.log('📊 Skipping client stats - user is not a client');
            return;
        }

        // Get client's tickets
        const { data: clientTickets, error } = await supabaseClient
            .from('tickets')
            .select('status')
            .eq('client_id', currentUser.id);

        if (error) {
            console.error('Error loading client tickets:', error);
            throw error;
        }

        // Calculate stats
        const totalCount = clientTickets?.length || 0;
        const openCount = clientTickets?.filter(t => t.status === 'open').length || 0;
        const inProgressCount = clientTickets?.filter(t => t.status === 'in-progress').length || 0;
        const closedCount = clientTickets?.filter(t => t.status === 'closed').length || 0;

        console.log('📊 Client stats calculated:', {
            total: totalCount,
            open: openCount,
            inProgress: inProgressCount,
            closed: closedCount
        });

        // Update UI
        const totalTicketsEl = document.getElementById('totalTickets');
        const openTicketsEl = document.getElementById('openTickets');
        const inProgressTicketsEl = document.getElementById('inProgressTickets');
        const closedTicketsEl = document.getElementById('closedTickets');

        if (totalTicketsEl) totalTicketsEl.textContent = totalCount;
        if (openTicketsEl) openTicketsEl.textContent = openCount;
        if (inProgressTicketsEl) inProgressTicketsEl.textContent = inProgressCount;
        if (closedTicketsEl) closedTicketsEl.textContent = closedCount;

        console.log('✅ Client stats loaded and UI updated successfully');
    } catch (error) {
        console.error('❌ Error loading client stats:', error);
        // Set defaults
        document.getElementById('totalTickets').textContent = '0';
        document.getElementById('openTickets').textContent = '0';
        document.getElementById('inProgressTickets').textContent = '0';
        document.getElementById('closedTickets').textContent = '0';
    }
}

// Load moderator statistics
async function loadModeratorStats() {
    try {
        console.log('📊 Loading moderator stats for user:', currentUser.id, 'role:', currentUserRole);

        if (currentUserRole !== 'moderator') {
            console.log('📊 Skipping moderator stats - user is not a moderator');
            return;
        }

        // Get tickets assigned to this moderator
        const { data: assignedTickets, error: assignedError } = await supabaseClient
            .from('tickets')
            .select('status, created_at, updated_at')
            .eq('assigned_to', currentUser.id);

        if (assignedError) {
            console.error('Error loading assigned tickets:', assignedError);
            throw assignedError;
        }

        // Get open tickets (unassigned) that moderators can take
        const { data: openTickets, error: openError } = await supabaseClient
            .from('tickets')
            .select('id')
            .eq('status', 'open')
            .is('assigned_to', null);

        if (openError) {
            console.error('Error loading open tickets:', openError);
        }

        // Calculate stats
        const assignedCount = assignedTickets?.length || 0;
        const openCount = openTickets?.length || 0;
        const inProgressCount = assignedTickets?.filter(t => t.status === 'in-progress').length || 0;

        // Calculate closed tickets today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const closedTodayCount = assignedTickets?.filter(t => {
            if (t.status !== 'closed') return false;
            const updatedDate = new Date(t.updated_at);
            updatedDate.setHours(0, 0, 0, 0);
            return updatedDate.getTime() === today.getTime();
        }).length || 0;

        console.log('📊 Moderator stats calculated:', {
            assigned: assignedCount,
            open: openCount,
            inProgress: inProgressCount,
            closedToday: closedTodayCount,
            assignedTickets: assignedTickets,
            openTickets: openTickets
        });

        // Update UI
        const totalTicketsEl = document.getElementById('totalTickets');
        const openTicketsEl = document.getElementById('openTickets');
        const inProgressTicketsEl = document.getElementById('inProgressTickets');
        const closedTicketsEl = document.getElementById('closedTickets');

        if (totalTicketsEl) totalTicketsEl.textContent = assignedCount;
        if (openTicketsEl) openTicketsEl.textContent = openCount;
        if (inProgressTicketsEl) inProgressTicketsEl.textContent = inProgressCount;
        if (closedTicketsEl) closedTicketsEl.textContent = closedTodayCount;

        console.log('✅ Moderator stats loaded and UI updated successfully');
    } catch (error) {
        console.error('❌ Error loading moderator stats:', error);
        // Set defaults
        document.getElementById('totalTickets').textContent = '0';
        document.getElementById('openTickets').textContent = '0';
        document.getElementById('inProgressTickets').textContent = '0';
        document.getElementById('closedTickets').textContent = '0';
    }
}

// Load admin statistics
async function loadAdminStats() {
    try {
        console.log('📊 Loading admin stats...');

        // Calculate total tickets
        const { data: totalTicketsData, error: totalError } = await supabaseClient
            .from('tickets')
            .select('id', { count: 'exact' });

        if (totalError) {
            console.error('Error counting total tickets:', totalError);
            document.getElementById('adminTotalTickets').textContent = '0';
        } else {
            const totalCount = totalTicketsData?.length || 0;
            console.log('📊 Total tickets count:', totalCount);
            document.getElementById('adminTotalTickets').textContent = totalCount;
        }

        // Calculate active moderators (moderators who are available)
        const { data: activeModerators, error: modError } = await supabaseClient
            .from('users')
            .select('id', { count: 'exact' })
            .eq('role', 'moderator')
            .eq('available', true);

        if (modError) {
            console.error('Error counting active moderators:', modError);
            document.getElementById('adminActiveModerators').textContent = '0';
        } else {
            const activeModCount = activeModerators?.length || 0;
            console.log('📊 Active moderators count:', activeModCount);
            document.getElementById('adminActiveModerators').textContent = activeModCount;
        }

        // Calculate open tickets count
        const { data: openTicketsData, error: openError } = await supabaseClient
            .from('tickets')
            .select('id', { count: 'exact' })
            .eq('status', 'open');

        if (openError) {
            console.error('Error counting open tickets:', openError);
            document.getElementById('adminOpenTickets').textContent = '0';
        } else {
            const openCount = openTicketsData?.length || 0;
            console.log('📊 Open tickets count:', openCount);
            document.getElementById('adminOpenTickets').textContent = openCount;
        }

        // Calculate closed tickets count
        const { data: closedTicketsData, error: closedError } = await supabaseClient
            .from('tickets')
            .select('id', { count: 'exact' })
            .eq('status', 'closed');

        if (closedError) {
            console.error('Error counting closed tickets:', closedError);
            document.getElementById('adminAvgResponseTime').textContent = '0min';
        } else {
            const closedCount = closedTicketsData?.length || 0;
            console.log('📊 Closed tickets count:', closedCount);
            // Note: We don't have a closed tickets display in admin dashboard, but keeping for future use
        }

        // Calculate average response time
        try {
            const { data: ticketsWithMessages, error: responseError } = await supabaseClient
                .from('tickets')
                .select(`
                    created_at,
                    messages!inner (
                        created_at,
                        sender_type
                    )
                `)
                .order('created_at', { ascending: false })
                .limit(50); // Last 50 tickets for performance

            if (responseError) {
                console.error('Error calculating response time:', responseError);
                document.getElementById('adminAvgResponseTime').textContent = '0min';
            } else if (ticketsWithMessages && ticketsWithMessages.length > 0) {
                let totalResponseTime = 0;
                let responseCount = 0;

                ticketsWithMessages.forEach(ticket => {
                    if (ticket.messages && ticket.messages.length > 0) {
                        // Find first staff response (not from client)
                        const firstStaffMessage = ticket.messages.find(msg =>
                            msg.sender_type !== 'client'
                        );

                        if (firstStaffMessage) {
                            const ticketTime = new Date(ticket.created_at);
                            const responseTime = new Date(firstStaffMessage.created_at);
                            const diffMinutes = (responseTime - ticketTime) / (1000 * 60);

                            if (diffMinutes > 0 && diffMinutes < 1440) { // Less than 24 hours
                                totalResponseTime += diffMinutes;
                                responseCount++;
                            }
                        }
                    }
                });

                const avgResponseTime = responseCount > 0 ? Math.round(totalResponseTime / responseCount) : 0;
                console.log('📊 Average response time:', avgResponseTime, 'minutes from', responseCount, 'responses');
                document.getElementById('adminAvgResponseTime').textContent = `${avgResponseTime}min`;
            } else {
                console.log('📊 No tickets with messages found for response time calculation');
                document.getElementById('adminAvgResponseTime').textContent = '0min';
            }
        } catch (responseTimeError) {
            console.error('Error in response time calculation:', responseTimeError);
            document.getElementById('adminAvgResponseTime').textContent = '0min';
        }

        console.log('✅ Admin stats loaded successfully');
    } catch (error) {
        console.error('❌ Error loading admin stats:', error);
        // Set defaults
        document.getElementById('adminTotalTickets').textContent = '0';
        document.getElementById('adminOpenTickets').textContent = '0';
        document.getElementById('adminActiveModerators').textContent = '0';
        document.getElementById('adminAvgResponseTime').textContent = '0min';
    }
}

// Load users list for admin
async function loadUsersList() {
    try {
        console.log('👥 Loading users list for admin...');
        const { data: users, error } = await supabaseClient
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        console.log('👥 Found', users?.length || 0, 'users:', users?.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role })));

        const usersList = document.getElementById('users-list');
        if (!usersList) {
            console.error('👥 Users list element not found');
            return;
        }

        usersList.innerHTML = '';

        users.forEach(user => {
            const userCard = createUserCard(user);
            usersList.appendChild(userCard);
        });

        console.log('👥 Users list loaded successfully');
    } catch (error) {
        console.error('Error loading users:', error);
        showNotification('Erreur lors du chargement des utilisateurs', 'error');
    }
}

// Load available moderators for assignment
async function loadAvailableModerators() {
    try {
        console.log('👥 Loading available moderators...');
        const { data: moderators, error } = await supabaseClient
            .from('users')
            .select('clerk_id, name, available')
            .eq('role', 'moderator')
            .order('name');

        if (error) {
            console.error('👥 Error loading moderators:', error);
            throw error;
        }

        console.log('👥 Found', moderators?.length || 0, 'moderators:', moderators);
        return moderators || [];
    } catch (error) {
        console.error('👥 Error loading moderators:', error);
        return [];
    }
}

// Create user card for admin management
function createUserCard(user) {
    const card = document.createElement('div');
    card.className = 'user-card';

    card.innerHTML = `
        <div class="user-info">
            <h4>${user.name || 'Utilisateur'}</h4>
            <p>${user.email}</p>
        </div>
        <div class="user-role ${user.role}">${user.role}</div>
        <div class="user-actions">
            <select onchange="updateUserRole('${user.id}', this.value)">
                <option value="client" ${user.role === 'client' ? 'selected' : ''}>Client</option>
                <option value="moderator" ${user.role === 'moderator' ? 'selected' : ''}>Modérateur</option>
                <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
            </select>
        </div>
    `;

    return card;
}

// Update user role
async function updateUserRole(userId, newRole) {
    try {
        const { error } = await supabaseClient
            .from('users')
            .update({ role: newRole })
            .eq('id', userId);

        if (error) throw error;

        showNotification('Rôle mis à jour avec succès', 'success');
        await loadUsersList();
    } catch (error) {
        console.error('Error updating user role:', error);
        showNotification('Erreur lors de la mise à jour du rôle', 'error');
    }
}

// Initialize availability toggle for moderators
function initializeAvailabilityToggle() {
    const availabilityToggle = document.getElementById('availability-toggle');
    if (!availabilityToggle) {
        console.log('⚠️ Availability toggle not found');
        return;
    }

    console.log('🔄 Initializing availability toggle...');

    // Load current availability status from database first, then localStorage as fallback
    supabaseClient
        .from('users')
        .select('available')
        .eq('clerk_id', currentUser.id)
        .single()
        .then(({ data, error }) => {
            if (error) {
                console.error('Error loading availability from DB:', error);
                // Fallback to localStorage
                const isAvailable = localStorage.getItem('moderator_available') === 'true';
                availabilityToggle.checked = isAvailable;
                console.log('🔄 Loaded availability from localStorage:', isAvailable);
            } else {
                const isAvailable = data?.available || false;
                availabilityToggle.checked = isAvailable;
                localStorage.setItem('moderator_available', isAvailable);
                console.log('🔄 Loaded availability from DB:', isAvailable);
            }
        })
        .catch(error => {
            console.error('Error in availability initialization:', error);
            // Fallback to localStorage
            const isAvailable = localStorage.getItem('moderator_available') === 'true';
            availabilityToggle.checked = isAvailable;
        });

    availabilityToggle.addEventListener('change', async function() {
        const available = this.checked;
        console.log('🔄 Availability toggle changed to:', available);

        // Update localStorage immediately for UI responsiveness
        localStorage.setItem('moderator_available', available);

        try {
            const { error } = await supabaseClient
                .from('users')
                .update({ available: available })
                .eq('clerk_id', currentUser.id);

            if (error) {
                console.error('Error updating availability in DB:', error);
                showNotification('Erreur lors de la mise à jour de la disponibilité', 'error');
                // Revert localStorage if DB update failed
                localStorage.setItem('moderator_available', !available);
                this.checked = !available;
                return;
            }

            console.log('✅ Availability updated in database');
            showNotification(available ? 'Vous êtes maintenant disponible' : 'Vous êtes maintenant indisponible', 'info');

            // If this is an admin viewing, refresh the stats
            if (currentUserRole === 'admin') {
                loadAdminStats();
            }
        } catch (error) {
            console.error('Error updating availability:', error);
            showNotification('Erreur lors de la mise à jour de la disponibilité', 'error');
            // Revert on error
            localStorage.setItem('moderator_available', !available);
            this.checked = !available;
        }
    });

    console.log('✅ Availability toggle initialized');
}

// Modal management functions
function initializeModalHandlers() {
    // Prevent duplicate event listener attachment
    if (window.modalHandlersInitialized) {
        console.log('✅ Modal handlers already initialized, skipping...');
        return;
    }

    console.log('🔧 Initializing modal handlers...');

    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });

    // Close modal with close button
    document.addEventListener('click', function(e) {
        if (e.target.closest('.close-modal')) {
            const modal = e.target.closest('.modal');
            if (modal) closeModal(modal.id);
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Find any currently open modal
            const openModals = document.querySelectorAll('.modal[style*="display: block"], .modal:not([style*="display: none"])');
            openModals.forEach(modal => {
                if (modal.style.display !== 'none' && modal.style.display !== '') {
                    closeModal(modal.id);
                }
            });
        }
    });

    // Handle form submissions
    document.getElementById('ticketForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        createTicket();
    });

    // Handle new ticket button
    document.getElementById('newTicketBtn')?.addEventListener('click', function() {
        openModal('ticketModal');
    });

    // Handle admin buttons
    document.getElementById('manageUsersBtn')?.addEventListener('click', function() {
        console.log('👥 Opening user management modal');
        openModal('userManagementModal');
        // Load users when modal opens
        setTimeout(() => loadUsersList(), 100);
    });

    document.getElementById('viewAnalyticsBtn')?.addEventListener('click', function() {
        showNotification('Fonctionnalité d\'analytics en cours de développement', 'info');
    });

    // Handle message form - only add listeners once
    const messageForm = document.getElementById('messageForm');
    if (messageForm && !messageForm.hasAttribute('data-listener-attached')) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendMessage();
        });
        messageForm.setAttribute('data-listener-attached', 'true');
    }

    const messageInput = document.getElementById('messageInput');
    if (messageInput && !messageInput.hasAttribute('data-listener-attached')) {
        // Character counter
        messageInput.addEventListener('input', function() {
            updateCharacterCounter();
            autoResizeTextarea();
        });

        // Enter to send (Shift+Enter for new line)
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Initialize on focus
        messageInput.addEventListener('focus', function() {
            updateCharacterCounter();
            autoResizeTextarea();
        });

        messageInput.setAttribute('data-listener-attached', 'true');
    }

    const sendBtn = document.querySelector('#sendBtn');
    if (sendBtn && !sendBtn.hasAttribute('data-listener-attached')) {
        sendBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sendMessage();
        });
        sendBtn.setAttribute('data-listener-attached', 'true');
    }

    // File upload functionality
    const fileUploadBtn = document.getElementById('fileUploadBtn');
    const fileInput = document.getElementById('fileInput');

    if (fileUploadBtn && fileInput && !fileUploadBtn.hasAttribute('data-listener-attached')) {
        fileUploadBtn.addEventListener('click', function() {
            fileInput.click();
        });

        fileInput.addEventListener('change', function(e) {
            handleFileUpload(e.target.files);
        });

        fileUploadBtn.setAttribute('data-listener-attached', 'true');
    }

    // Mark as initialized
    window.modalHandlersInitialized = true;
    console.log('✅ Modal handlers initialized');
}

// Open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';

        // Unsubscribe from chat channel when closing chat modal
        if (modalId === 'chat-modal' && chatChannel) {
            supabaseClient.removeChannel(chatChannel);
            chatChannel = null;
            currentTicketId = null;
        }
    }
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="margin-left: 10px; background: none; border: none; color: white; cursor: pointer;">×</button>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Initialize search functionality
function initializeSearch() {
    console.log('🔍 Initializing search functionality...');

    // Client search
    const clientSearchInput = document.getElementById('clientSearchInput');
    if (clientSearchInput) {
        clientSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            filterTickets(searchTerm, 'client');
        });
        console.log('✅ Client search initialized');
    }

    // Moderator search
    const moderatorSearchInput = document.getElementById('moderatorSearchInput');
    if (moderatorSearchInput) {
        moderatorSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            filterTickets(searchTerm, 'moderator');
        });
        console.log('✅ Moderator search initialized');
    }

    // Admin search
    const adminSearchInput = document.getElementById('adminSearchInput');
    if (adminSearchInput) {
        adminSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            filterTickets(searchTerm, 'admin');
        });
        console.log('✅ Admin search initialized');
    }

    console.log('✅ Search functionality initialized');
}

// Filter tickets based on search term
function filterTickets(searchTerm, role) {
    const tableBodyId = role === 'client' ? 'ticketsTableBody' :
                       role === 'moderator' ? 'moderatorTicketsTableBody' :
                       'adminTicketsTableBody';

    const tableBody = document.getElementById(tableBodyId);
    if (!tableBody) {
        console.error('❌ Table body not found:', tableBodyId);
        return;
    }

    const rows = tableBody.querySelectorAll('tr');
    if (rows.length === 0) return;

    console.log('🔍 Filtering', rows.length, 'tickets for role:', role, 'with term:', searchTerm);

    rows.forEach(row => {
        if (row.classList.contains('empty-state')) return; // Skip empty state row

        const titleCell = row.querySelector('td:nth-child(2)');
        const statusCell = row.querySelector('td:nth-child(3)');
        const priorityCell = row.querySelector('td:nth-child(4)');

        if (titleCell && statusCell && priorityCell) {
            const title = titleCell.textContent.toLowerCase();
            const status = statusCell.textContent.toLowerCase();
            const priority = priorityCell.textContent.toLowerCase();

            const matches = title.includes(searchTerm) ||
                          status.includes(searchTerm) ||
                          priority.includes(searchTerm);

            row.style.display = matches || searchTerm === '' ? '' : 'none';
        }
    });
}

// Update user role display in the UI
function updateUserRoleDisplay() {
    if (!currentUser || !currentUserRole) {
        console.log('❌ Cannot update role display - missing user or role');
        return;
    }

    console.log('👤 Updating role display for role:', currentUserRole);

    const roleDisplays = [
        'clientUserRole',
        'moderatorUserRole',
        'adminUserRole',
        'userRole' // Generic fallback
    ];

    const roleLabels = {
        'client': 'Client',
        'moderator': 'Modérateur',
        'admin': 'Administrateur'
    };

    const displayText = roleLabels[currentUserRole] || currentUserRole;

    roleDisplays.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = displayText;
            console.log('✅ Updated role display in element:', elementId, 'to:', displayText);
        }
    });
}

// Export functions for global access
window.createTicket = createTicket;
window.updateTicketStatus = updateTicketStatus;
window.assignTicket = assignTicket;
window.openTicketChat = openTicketChat;
window.sendMessage = sendMessage;
window.updateUserRole = updateUserRole;
window.openModal = openModal;
window.closeModal = closeModal;

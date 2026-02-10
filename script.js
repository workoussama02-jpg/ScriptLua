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
        showPrice: true,
        showPricePrefix: false,
        priceLabel: "- Gratuit via parrainage",
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
        showPrice: true,
        showPricePrefix: true,
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
        price: 0,
        showPrice: true,
        showPricePrefix: false,
        priceLabel: "- Gratuit via parrainage",
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
        price: 0,
        showPrice: true,
        showPricePrefix: false,
        priceLabel: "- Gratuit via parrainage",
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
        price: 0,
        showPrice: true,
        showPricePrefix: false,
        priceLabel: "- Gratuit via parrainage",
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
        showPrice: true,
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
        showPrice: true,
        showPricePrefix: false,
        priceLabel: "- Gratuit via parrainage",
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
        price: 0,
        showPrice: true,
        showPricePrefix: false,
        priceLabel: "- Gratuit via parrainage",
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
        price: 0,
        showPrice: true,
        showPricePrefix: false,
        priceLabel: "- Gratuit via parrainage",
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
        category: "prive",
        description: "Script farm Ailes de Koutoulou avec IA avancée pour Snowbot.",
        badge: "Gratuit via parrainage",
        price: 0,
        showPrice: true,
        showPricePrefix: false,
        priceLabel: "- Gratuit via parrainage",
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
        price: 0,
        showPrice: true,
        showPricePrefix: false,
        priceLabel: "- Gratuit via parrainage",
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
        showPrice: true,
        showPricePrefix: false,
        priceLabel: "- Gratuit via parrainage",
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
    // ===== SCRIPT 14: Donjon Vénérable Endormi =====
    {
        id: 14,
        name: "Vénérable Endormi - 100% WIN & LOW COST",
        category: "combat",
        description: "Retrouvez le script du PL Vénérable Endormi Auto Win et Low Cost !",
        badge: "Gratuit via parrainage",
        price: 0,
        showPrice: true,
        showPricePrefix: false,
        priceLabel: "- Gratuit via parrainage",
        image: "venerable.png",
        detailedDescription: `
            <p>Hello!</p>
            <p>Pour la Configuration, vous avez besoin de <strong>4 Rox</strong> (personnages level 200) - <strong>4 Sasa</strong> (mules) <strong>- Coût stuff total : 100-120M kamas pour la totalité des personnages</strong> (moins cher que Belladone !) ⚡</p>
            <p>Fonctionnalités:</p>
            <p>✅ Settings personnalisables pour stuffs Sasa</p>
            <p>✅ Webhooks Discord (suivi combats/leveling)</p>
            <p>✅ Combat IA optimisée</p>
            <p>✅ À venir : Version intégrant up 1-50 + chasse au portail 💰</p>
            <p>Tarif <strong>500$ (427€) | GRATUIT</strong> pour Team Succès ou dépôt 1000$+ avec code CLARTEK Script permanent avec mises à jour incluses.</p>
        `,
        instructions: `
            <p>Vous avez juste à lire le guide, et tout fonctionnera parfaitement pour vous !</p>
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
                    redirectUrl: window.location.href,
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
                                redirectUrl: window.location.href,
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
            redirectUrl: window.location.href,
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

// HTML escaping helper function to prevent XSS attacks
function escapeHtml(text) {
    if (text == null) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Supabase Configuration (from environment variables)
// Priority: window.AppConfig > window._env_ > hardcoded fallback
const SUPABASE_URL = window.AppConfig?.supabase?.url || 
                     window._env_?.VITE_SUPABASE_URL || 
                     'https://ndniosrqgrzcsqnfabxr.supabase.co';
const SUPABASE_ANON_KEY = window.AppConfig?.supabase?.anonKey || 
                          window._env_?.VITE_SUPABASE_ANON_KEY || 
                          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbmlvc3JxZ3J6Y3NxbmZhYnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NjEyNTAsImV4cCI6MjA4NTEzNzI1MH0.vu7GRZ-C-qdhPT8niHVOgz3E1Sxhv5hewi-GDSGR01w';

// Debug Configuration
const DEBUG = true; // localStorage.getItem('debug') === 'true';

// Initialize Supabase client
let supabaseClient = null;
let currentUser = null;
let currentUserRole = null;
let currentUserDbId = null; // Database UUID for the user
let currentTicketId = null;
let chatChannel = null;
let ticketsChannel = null; // For real-time ticket updates
let isInitialized = false; // Flag to prevent duplicate initialization

// Promise that resolves when ticketing system is initialized
let ticketingSystemReady = new Promise(resolve => {
    // Store the resolve function to be called when initialization is complete
    window.resolveTicketingReady = resolve;
});

// Initialize ticketing system
async function initializeTicketingSystem() {
    // Prevent duplicate initialization
    if (isInitialized) {
        console.log('✅ Ticketing system already initialized, skipping...');
        return;
    }

    try {
        console.log('🚀 Initializing ticketing system...');

        // Check if user is authenticated with Clerk
        if (!window.Clerk || !window.Clerk.user || !window.Clerk.user.id) {
            console.log('❌ User not authenticated');
            return;
        }

        currentUser = window.Clerk.user;
        console.log('✅ User authenticated:', currentUser);

        // Initialize Supabase client for read-only operations
        // SECURITY NOTE: This client uses anon key and should ONLY be used for safe read operations
        // All privileged operations (writes, sensitive reads) must use server-side Edge Functions
        // to ensure proper authentication, authorization, and data validation
        if (!supabaseClient) {
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('✅ Supabase read-only client initialized with anon key');
        } else {
            console.log('✅ Supabase read-only client already initialized');
        }

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

        // Resolve the ready promise
        if (window.resolveTicketingReady) {
            window.resolveTicketingReady();
        }
    } catch (error) {
        console.error('❌ Error initializing ticketing system:', error);
        showNotification('Erreur lors de l\'initialisation du système', 'error');
    }
}

// Load user role from database
async function loadUserRole() {
    try {
        console.log('👤 Loading user role for:', currentUser.id);

        const { data: userData, error } = await supabaseClient
            .from('users')
            .select('id, role, active')
            .eq('clerk_id', currentUser.id)
            .single();

        console.log('👤 Database query result:', { userData, error });
        console.log('👤 Current user ID:', currentUser.id);
        console.log('👤 Current user object:', currentUser);

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
            console.error('👤 Error loading user role:', error);
            throw error;
        }

        if (userData) {
            console.log('👤 User data from DB:', userData);
            console.log('👤 User active status:', userData.active);
            console.log('👤 User role from DB:', userData.role);

            if (!userData.active) {
                console.log('👤 User account is deactivated - showing blocked access message');
                showBlockedAccessMessage();
                return; // Don't proceed with role loading
            }
            currentUserRole = userData.role;
            currentUserDbId = userData.id;
            console.log('👤 User role loaded from DB:', currentUserRole);
            console.log('👤 User database ID:', currentUserDbId);

            const discordAccount = currentUser.externalAccounts?.find(account => account.provider === 'discord');
            console.log('👤 Current user external accounts:', currentUser.externalAccounts);
            console.log('👤 Discord account found:', !!discordAccount);
            if (discordAccount) {
                console.log('👤 Full Discord account object:', JSON.stringify(discordAccount, null, 2));
                console.log('👤 Discord account properties:', Object.keys(discordAccount));
                console.log('👤 Avatar URL from Clerk:', discordAccount.avatarUrl);
                console.log('👤 Discord user ID:', discordAccount.providerUserId || discordAccount.id);
                // Format Discord avatar URL if needed
                let avatarUrl = discordAccount.avatarUrl;
                if (avatarUrl && !avatarUrl.startsWith('http')) {
                    // If it's just a hash, construct the full Discord CDN URL
                    const discordUserId = discordAccount.providerUserId || discordAccount.id;
                    if (discordUserId && avatarUrl) {
                        avatarUrl = `https://cdn.discordapp.com/avatars/${discordUserId}/${avatarUrl}.png`;
                        console.log('👤 Constructed full Discord avatar URL:', avatarUrl);
                    }
                }

                console.log('👤 Discord account data:', {
                    username: discordAccount.username,
                    avatarUrl: avatarUrl
                });
                // Check if Discord info needs updating
                const needsUpdate = !userData.discord_username ||
                                   !userData.discord_avatar ||
                                   userData.discord_username !== discordAccount.username ||
                                   userData.discord_avatar !== avatarUrl;

                console.log('👤 Discord update check:', {
                    hasUsername: !!userData.discord_username,
                    hasAvatar: !!userData.discord_avatar,
                    usernameMatches: userData.discord_username === discordAccount.username,
                    avatarMatches: userData.discord_avatar === avatarUrl,
                    needsUpdate: needsUpdate
                });

                if (needsUpdate) {
                    console.log('👤 Updating Discord info for existing user - storing avatar:', avatarUrl);
                    const { error: updateError } = await supabaseClient
                        .from('users')
                        .update({
                            discord_username: discordAccount.username,
                            discord_avatar: avatarUrl
                        })
                        .eq('clerk_id', currentUser.id);

                    if (updateError) {
                        console.error('👤 Error updating Discord info:', updateError);
                    } else {
                        console.log('👤 Discord info updated for existing user - avatar stored:', avatarUrl);
                    }
                } else {
                    console.log('👤 Discord info already up-to-date for user');
                }
            } else {
                console.log('👤 No Discord account linked to this Clerk user');
                console.log('👤 Available external accounts:', currentUser.externalAccounts?.map(acc => acc.provider));
            }
        } else {
            console.log('👤 User not found in DB, creating new user record');
            console.log('👤 No userData returned, will create new user with client role');
            // Create new user record with Discord information
            const discordAccount = currentUser.externalAccounts?.find(account => account.provider === 'discord');
            if (discordAccount) {
                console.log('👤 Full Discord account object for new user:', JSON.stringify(discordAccount, null, 2));
                console.log('👤 Discord account properties for new user:', Object.keys(discordAccount));
                console.log('👤 Avatar URL from Clerk for new user:', discordAccount.avatarUrl);
                console.log('👤 Discord user ID for new user:', discordAccount.providerUserId || discordAccount.id);
            }

            let avatarUrl = null;
            if (discordAccount?.avatarUrl) {
                avatarUrl = discordAccount.avatarUrl;
                if (!avatarUrl.startsWith('http')) {
                    console.log('👤 Avatar URL might need formatting for new user:', avatarUrl);
                    // If it's just a hash, construct the full Discord CDN URL
                    const discordUserId = discordAccount.providerUserId || discordAccount.id;
                    if (discordUserId && avatarUrl) {
                        avatarUrl = `https://cdn.discordapp.com/avatars/${discordUserId}/${avatarUrl}.png`;
                        console.log('👤 Constructed full Discord avatar URL for new user:', avatarUrl);
                    }
                }
            }

            console.log('👤 Creating new user with Discord data:', {
                username: discordAccount?.username,
                avatarUrl: avatarUrl,
                avatarUrlLength: avatarUrl?.length || 0
            });

            const { data: newUser, error: insertError } = await supabaseClient
                .from('users')
                .insert([{
                    clerk_id: currentUser.id,
                    email: currentUser.emailAddresses[0]?.emailAddress,
                    name: currentUser.firstName || currentUser.username,
                    discord_username: discordAccount?.username || null,
                    discord_avatar: avatarUrl,
                    role: 'client', // Default role
                    active: true
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
        
        // Refresh current user's Discord info to ensure avatars are up-to-date
        await refreshCurrentUserDiscordInfo();
    } catch (error) {
        console.error('❌ Error in loadUserRole:', error);
        console.log('❌ Falling back to client role due to error');
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

// Update user role display in the UI
function updateUserRoleDisplay() {
    console.log('🎨 Updating user role display for role:', currentUserRole);

    const roleLabels = {
        'client': 'Client',
        'moderator': 'Modérateur',
        'admin': 'Administrateur'
    };

    const roleDisplay = roleLabels[currentUserRole] || 'Client';

    // Update role display elements based on current dashboard
    const userRoleElement = document.getElementById('userRole');
    const moderatorUserRoleElement = document.getElementById('moderatorUserRole');
    const adminUserRoleElement = document.getElementById('adminUserRole');

    if (userRoleElement) {
        userRoleElement.textContent = roleDisplay;
        console.log('✅ Updated userRole element to:', roleDisplay);
    }
    if (moderatorUserRoleElement) {
        moderatorUserRoleElement.textContent = roleDisplay;
        console.log('✅ Updated moderatorUserRole element to:', roleDisplay);
    }
    if (adminUserRoleElement) {
        adminUserRoleElement.textContent = roleDisplay;
        console.log('✅ Updated adminUserRole element to:', roleDisplay);
    }
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
    console.log('👑 Current user:', currentUser);
    console.log('👑 Current user role:', currentUserRole);

    // Load admin stats and user management
    loadAdminStats();
    loadUsersList();
    initializeAdminFilters();
    // Initialize search functionality
    initializeSearch();

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
                option.value = moderator.clerk_id; // Use Clerk ID to match assigned_to field
                option.textContent = moderator.name;
                moderatorFilter.appendChild(option);
            });
        });

        moderatorFilter.addEventListener('change', () => loadTickets());
    }

    // Load tickets after filters are initialized
    // Moved to initializeApp() to ensure proper timing
}

// Load tickets based on user role
async function loadTickets() {
    try {
        console.log('🎫 Loading tickets for role:', currentUserRole);

        // Check if supabaseClient is available
        if (!supabaseClient) {
            console.log('⚠️ Supabase client not available yet, skipping ticket loading');
            return;
        }

        // Check if currentUserRole is set
        if (!currentUserRole) {
            console.log('⚠️ User role not available yet, skipping ticket loading');
            return;
        }

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

            // Calculate unread counts for client tickets using DB UUID
            if (tickets) {
                const unreadResults = await Promise.allSettled(
                    tickets.map(ticket => getUnreadMessageCount(ticket.id, currentUserDbId))
                );
                tickets.forEach((ticket, index) => {
                    ticket.unreadCount = unreadResults[index].status === 'fulfilled' ? unreadResults[index].value : 0;
                    console.log(`🔔 Client ticket ${ticket.id} unread count:`, ticket.unreadCount);
                });
            }
        } else if (currentUserRole === 'moderator') {
            // Moderators should see: tickets assigned to them OR open tickets (unassigned)
            console.log('🎫 Filtering for moderator:', currentUserDbId);
            console.log('🎫 Current user role:', currentUserRole);
            console.log('🎫 Current user ID (Clerk):', currentUser.id);
            console.log('🎫 Current user DB ID:', currentUserDbId);

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

            console.log('🎫 Assigned query result:', assignedResult);
            console.log('🎫 Open query result:', openResult);

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

            console.log('🎫 Assigned tickets count:', assignedTickets.length);
            console.log('🎫 Open tickets count:', openTickets.length);
            console.log('🎫 Combined tickets count:', allTickets.length);

            // Remove duplicates (in case a ticket is both assigned to moderator and open)
            const uniqueTickets = allTickets.filter((ticket, index, self) =>
                index === self.findIndex(t => t.id === ticket.id)
            );

            console.log('🎫 Unique tickets count:', uniqueTickets.length);

            // Sort by creation date (newest first)
            uniqueTickets.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            tickets = uniqueTickets;
            error = null;

            // Calculate unread counts for moderator tickets
            if (tickets) {
                const unreadResults = await Promise.allSettled(
                    tickets.map(ticket => getUnreadMessageCount(ticket.id, currentUserDbId))
                );
                tickets.forEach((ticket, index) => {
                    ticket.unreadCount = unreadResults[index].status === 'fulfilled' ? unreadResults[index].value : 0;
                    console.log(`🔔 Moderator ticket ${ticket.id} unread count:`, ticket.unreadCount);
                });
            }
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

            // Calculate unread counts for admin tickets
            if (tickets) {
                const unreadResults = await Promise.allSettled(
                    tickets.map(ticket => getUnreadMessageCount(ticket.id, currentUserDbId))
                );
                tickets.forEach((ticket, index) => {
                    ticket.unreadCount = unreadResults[index].status === 'fulfilled' ? unreadResults[index].value : 0;
                    console.log(`🔔 Admin ticket ${ticket.id} unread count:`, ticket.unreadCount);
                });
            }
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
    row.className = 'hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors relative';
    row.setAttribute('data-ticket-id', ticket.id);

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

    // Extract problem type from title (remove "Support: " prefix)
    const problemType = ticket.title.replace(/^Support:\s*/, '');

    // Create unread message indicator
    let unreadIndicator = '';
    console.log(`🎨 Creating ticket card for ${ticket.id}, unreadCount:`, ticket.unreadCount);
    if (ticket.unreadCount > 0) {
        console.log(`✅ Adding unread indicator for ticket ${ticket.id}:`, ticket.unreadCount, 'messages');
        unreadIndicator = `
            <div class="ml-2 flex items-center space-x-1">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    <span class="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                    ${ticket.unreadCount} message${ticket.unreadCount > 1 ? 's' : ''} non lu${ticket.unreadCount > 1 ? 's' : ''}
                </span>
            </div>
        `;
    } else {
        console.log(`ℹ️ No unread messages for ticket ${ticket.id}`);
    }

    // Short ticket ID (first 8 characters)
    const shortId = ticket.id.substring(0, 8);

    // Priority dropdown for admins and moderators
    let priorityHtml = '';
    if (currentUserRole === 'admin' || currentUserRole === 'moderator') {
        priorityHtml = `
            <select onchange="updateTicketPriority('${ticket.id}', this.value); event.stopPropagation();" 
                    class="px-2 py-1 text-xs border border-slate-200 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white cursor-pointer hover:border-slate-300 dark:hover:border-slate-500 transition-colors">
                <option value="low" ${ticket.priority === 'low' ? 'selected' : ''}>Faible</option>
                <option value="normal" ${ticket.priority === 'normal' ? 'selected' : ''}>Normal</option>
                <option value="high" ${ticket.priority === 'high' ? 'selected' : ''}>Élevé</option>
                <option value="urgent" ${ticket.priority === 'urgent' ? 'selected' : ''}>Urgent</option>
            </select>
        `;
    } else {
        priorityHtml = `<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[ticket.priority] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'}">${ticket.priority}</span>`;
    }

    // Actions dropdown menu
    const actionsMenuId = `actions-menu-${ticket.id}`;
    let actionsHtml = '';

    if (currentUserRole === 'admin' || currentUserRole === 'moderator') {
        actionsHtml = `
            <div class="relative">
                <button class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        title="Actions">
                    <span class="material-icons-round text-lg">settings</span>
                </button>
                <div id="${actionsMenuId}" class="absolute right-0 mt-1 w-60 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-10 hidden">
                    <div class="py-1">`;

        // Assignment dropdown for admin
        if (currentUserRole === 'admin') {
            actionsHtml += `
                        <div class="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                            <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Assigner à:</label>
                            <select class="assign-select w-full px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white" onchange="assignTicket('${ticket.id}', this.value)">
                                <option value="">Choisir un modérateur...</option>
                                <!-- Moderators will be loaded here -->
                            </select>
                        </div>`;
        }

        // Status actions
        if (ticket.status !== 'closed') {
            actionsHtml += `<button class="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center action-btn" data-action="close" data-ticket-id="${ticket.id}">
                            <span class="material-icons-round text-sm mr-2">check_circle</span>Fermer le ticket
                        </button>`;
        }

        if (currentUserRole === 'moderator' && ticket.status === 'open') {
            actionsHtml += `<button class="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center action-btn" data-action="take" data-ticket-id="${ticket.id}">
                            <span class="material-icons-round text-sm mr-2">play_arrow</span>Prendre en charge
                        </button>`;
        }

        if (ticket.status !== 'escalated') {
            actionsHtml += `<button class="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center action-btn" data-action="escalate" data-ticket-id="${ticket.id}">
                            <span class="material-icons-round text-sm mr-2">arrow_upward</span>Escalader
                        </button>`;
        }

        // Details button for staff
        actionsHtml += `<button class="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center action-btn" data-action="details" data-ticket-id="${ticket.id}">
                        <span class="material-icons-round text-sm mr-2">info</span>Détails du ticket
                    </button>`;

        // Delete button (admin only) with separator
        if (currentUserRole === 'admin') {
            actionsHtml += `<div class="border-t border-slate-200 dark:border-slate-700 my-1"></div>
                        <button class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center action-btn" data-action="delete" data-ticket-id="${ticket.id}">
                            <span class="material-icons-round text-sm mr-2">delete_forever</span>Supprimer définitivement
                        </button>`;
        }

        actionsHtml += `
                    </div>
                </div>
            </div>`;
    }

    row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">#${escapeHtml(shortId)}</td>
        <td class="px-6 py-4 whitespace-nowrap" data-title-cell>
            <div class="flex items-center">
                <div class="text-sm font-medium text-slate-900 dark:text-white">${escapeHtml(problemType)}</div>
                ${unreadIndicator}
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[ticket.status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'}">${escapeHtml(ticket.status)}</span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap" onclick="event.stopPropagation();">
            ${priorityHtml}
        </td>
        ${currentUserRole === 'admin' ? `
        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">${escapeHtml(ticket.assigned_to_name || 'Non assigné')}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">${escapeHtml(ticket.client_name || 'Client inconnu')}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">${new Date(ticket.created_at).toLocaleDateString('fr-FR')}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" onclick="event.stopPropagation();">
            <div class="flex items-center space-x-2">
                <button onclick="openTicketChat('${ticket.id}')" class="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-1">
                    <span class="material-icons-round text-sm">chat</span>
                    <span>Ouvrir</span>
                </button>
                ${actionsHtml}
            </div>
        </td>` : currentUserRole === 'moderator' ? `
        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">${escapeHtml(ticket.client_name || 'Client inconnu')}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">${new Date(ticket.created_at).toLocaleDateString('fr-FR')}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" onclick="event.stopPropagation();">
            <div class="flex items-center space-x-2">
                <button onclick="openTicketChat('${ticket.id}')" class="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-1">
                    <span class="material-icons-round text-sm">chat</span>
                    <span>Ouvrir</span>
                </button>
                ${actionsHtml}
            </div>
        </td>` : `
        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">${escapeHtml(ticket.assigned_to_name || 'Non assigné')}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">${new Date(ticket.created_at).toLocaleDateString('fr-FR')}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" onclick="event.stopPropagation();">
            <div class="flex items-center space-x-2">
                <button onclick="openTicketChat('${ticket.id}')" class="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-1">
                    <span class="material-icons-round text-sm">chat</span>
                    <span>Ouvrir</span>
                </button>
                ${actionsHtml}
            </div>
        </td>`}`;

    // Add event listeners to action buttons
    if (currentUserRole === 'admin' || currentUserRole === 'moderator') {
        // Toggle menu button
        const toggleBtn = row.querySelector('button[title="Actions"]');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleActionsMenu(actionsMenuId);
            });
        }

        // Action buttons
        const actionButtons = row.querySelectorAll('.action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const action = btn.getAttribute('data-action');
                const ticketId = btn.getAttribute('data-ticket-id');

                console.log('🎯 Action button clicked:', action, 'for ticket:', ticketId);

                if (action === 'close') {
                    await window.updateTicketStatus(ticketId, 'closed');
                } else if (action === 'take') {
                    await window.updateTicketStatus(ticketId, 'in-progress');
                } else if (action === 'escalate') {
                    await window.updateTicketStatus(ticketId, 'escalated');
                } else if (action === 'delete') {
                    await window.deleteTicket(ticketId);
                } else if (action === 'details') {
                    await window.showTicketDetails(ticketId);
                }

                toggleActionsMenu(actionsMenuId);
            });
        });

        // Assignment dropdown for admin
        if (currentUserRole === 'admin') {
            const assignSelect = row.querySelector('.action-btn + div select');
            if (assignSelect) {
                assignSelect.addEventListener('change', async (e) => {
                    const moderatorId = e.target.value;
                    console.log('👤 Assignment dropdown changed, selected moderator:', moderatorId);
                    if (moderatorId) {
                        await window.assignTicket(ticket.id, moderatorId);
                        toggleActionsMenu(actionsMenuId);
                    }
                });
            }
        }
    }

    return row;
}

// ===================================================================
// SECURE SUPABASE OPERATIONS
// ===================================================================

/**
 * Get an authenticated Supabase client for privileged operations
 * This should be used instead of the anon key client for any write operations
 * or sensitive read operations that require user authentication
 *
 * SECURITY CRITICAL: This function currently returns an insecure anon-key client.
 * TODO: Implement proper JWT token exchange with server-side endpoint
 * Issue: #AUTH-001 - Implement authenticated Supabase client
 * PR: TBD - JWT token exchange implementation
 * Risk: Using anon-key for authenticated operations bypasses security controls
 */
async function getAuthenticatedSupabaseClient() {
    // SECURITY: Prevent misuse of insecure client for authenticated operations
    throw new Error(
        'getAuthenticatedSupabaseClient: Not implemented. ' +
        'Cannot use anon-key client for authenticated operations. ' +
        'See TODO: Issue #AUTH-001 - Implement JWT token exchange'
    );

    // This code should never be reached, but kept for reference:
    // TODO: Implement JWT token exchange
    // const response = await fetch('/api/auth/exchange-token', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ clerkToken: await getClerkToken() })
    // });
    // const { supabaseToken } = await response.json();
    // return createClient(SUPABASE_URL, supabaseToken);
}

/**
 * Call server-side endpoint for privileged operations
 * @param {string} functionName - Name of the Edge Function to call
 * @param {object} payload - Data to send to the function
 * @returns {Promise} - Result from the Edge Function
 */
async function callSecureEndpoint(functionName, payload = {}) {
    try {
        // Log minimal safe context without exposing sensitive payload data
        const payloadKeys = Object.keys(payload);
        const payloadSize = JSON.stringify(payload).length;
        console.log(`🔒 Calling secure endpoint: ${functionName} (payload keys: [${payloadKeys.join(', ')}], size: ${payloadSize} chars)`);

        // Get the Clerk session token to authenticate with Edge Functions
        if (!window.Clerk || !window.Clerk.session) {
            throw new Error('Clerk session not available');
        }

        console.log('🔑 Getting Clerk session token...');
        // Use default session token (not the 'supabase' template)
        const token = await window.Clerk.session.getToken();
        
        if (!token) {
            throw new Error('No authentication token available');
        }

        // Debug: Decode and log token details (only in debug mode)
        if (DEBUG) {
            try {
                const [headerB64, payloadB64] = token.split('.');
                const decodeBase64 = (str) => {
                    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
                    while (base64.length % 4) base64 += '=';
                    return JSON.parse(atob(base64));
                };
                const header = decodeBase64(headerB64);
                const payload = decodeBase64(payloadB64);
                console.log('🔍 Token Header:', header);
                console.log('🔍 Token Payload:', payload);
                console.log('🔍 Token Claims:', {
                    issuer: payload.iss,
                    audience: payload.aud,
                    subject: payload.sub,
                    expiration: new Date(payload.exp * 1000).toISOString()
                });
            } catch (e) {
                console.error('Failed to decode token:', e);
            }
        }

        console.log('✅ Got Clerk token, length:', token.length, 'first 50 chars:', token.substring(0, 50));

        // Use fetch directly to ensure proper body sending
        const response = await fetch(`${SUPABASE_URL}/functions/v1/${functionName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'x-clerk-token': token
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`❌ Error calling ${functionName}:`, response.status, data);
            throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`);
        }

        if (data && !data.success) {
            console.error(`📋 Function returned error:`, data);
            if (data.debug) {
                console.error(`🔍 Debug info:`, data.debug);
            }
        }

        console.log(`✅ Secure endpoint ${functionName} completed successfully`);
        return data;
    } catch (error) {
        console.error(`❌ Failed to call secure endpoint ${functionName}:`, error);
        throw error;
    }
}

/**
 * Calls the Supabase Edge Function to send Discord notification for new ticket
 * @param {Object} ticket - The ticket object from database
 */
async function notifyNewTicket(ticket) {
    try {
        console.log('🔔 Sending Discord notification for ticket:', ticket.id);
        
        // Use authenticated endpoint
        const result = await callSecureEndpoint('notify-ticket-created', { ticket });
        
        if (!result.success) {
            console.error('Discord notification error:', result.error);
            return { success: false, error: result.error };
        }
        
        console.log('✅ Discord notification sent:', result.data);
        return { success: true, data: result.data };
        
    } catch (err) {
        console.error('Exception sending Discord notification:', err);
        return { success: false, error: err.message };
    }
}

/**
 * Calls the Supabase Edge Function when moderator claims a ticket
 * @param {string} ticketId - UUID of the ticket
 * @param {string} moderatorId - UUID of the moderator
 * @param {string} moderatorName - Display name of moderator
 */
async function notifyTicketClaimed(ticketId, moderatorId, moderatorName) {
    try {
        console.log(`🔔 Notifying ticket claim: ${ticketId} by ${moderatorName}`);
        
        const result = await callSecureEndpoint('notify-ticket-claimed', {
            ticket_id: ticketId,
            moderator_id: moderatorId,
            moderator_name: moderatorName
        });
        
        if (!result.success) {
            console.error('Claim notification error:', result.error);
            return { success: false, error: result.error };
        }
        
        console.log('✅ Claim notification sent:', result);
        return { success: true, data: result };
        
    } catch (err) {
        console.error('Exception sending claim notification:', err);
        return { success: false, error: err.message };
    }
}

// ===================================================================
// TICKET FUNCTIONS
// ===================================================================

async function createTicket() {
    // Check if user is authenticated
    if (!currentUser) {
        console.log('❌ User not authenticated, showing sign-in modal');
        showNotification('Veuillez vous connecter pour créer un ticket', 'error');
        const authContainer = document.getElementById('clerk-auth-container');
        if (authContainer) {
            authContainer.classList.add('show');
        }
        return;
    }

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
        // Use server-side endpoint for ticket creation
        const ticketData = {
            title,
            description,
            priority: 'normal'
        };

        const result = await callSecureEndpoint('create-ticket', {
            ticketData
        });

        const ticket = result.ticket;

        console.log('🎫 Ticket created successfully:', ticket);

        // Send Discord notification (optional - won't affect user experience if it fails)
        // Note: This currently requires additional authentication setup
        // notifyNewTicket(ticket).catch(err => {
        //     console.warn('Discord notification not sent:', err.message);
        // });

        showNotification('Ticket créé avec succès', 'success');

        closeModal('ticketModal');
        document.getElementById('ticketForm').reset();
        await loadTickets();
    } catch (error) {
        console.error('❌ Error creating ticket:', error);
        showNotification('Erreur lors de la création du ticket', 'error');
    }
}

// Update ticket priority
async function updateTicketPriority(ticketId, newPriority) {
    try {
        await callSecureEndpoint('update-ticket-priority', {
            ticketId,
            newPriority
        });

        showNotification(`Priorité du ticket mise à jour: ${newPriority}`, 'success');
        await loadTickets();
    } catch (error) {
        console.error('Error updating ticket priority:', error);
        showNotification('Erreur lors de la mise à jour de la priorité', 'error');
    }
}

// Assign ticket to moderator
async function assignTicket(ticketId, moderatorId) {
    if (!moderatorId) return; // No moderator selected

    try {
        const result = await callSecureEndpoint('assign-ticket', {
            ticketId,
            moderatorId
        });

        // Send Discord claim notification (non-blocking)
        notifyTicketClaimed(ticketId, result.moderatorId, result.moderatorName).catch(err => {
            console.error('Background claim notification failed:', err);
        });

        showNotification(`Ticket assigné à ${result.moderatorName}`, 'success');
        await loadTickets();
    } catch (error) {
        console.error('Error assigning ticket:', error);
        showNotification('Erreur lors de l\'assignation du ticket', 'error');
    }
}

// Update ticket status
async function updateTicketStatus(ticketId, newStatus) {
    try {
        await callSecureEndpoint('update-ticket-status', {
            ticketId,
            newStatus
        });

        showNotification(`Statut du ticket mis à jour: ${newStatus}`, 'success');
        await loadTickets();
    } catch (error) {
        console.error('Error updating ticket status:', error);
        showNotification('Erreur lors de la mise à jour du statut', 'error');
    }
}

// Delete ticket permanently
async function deleteTicket(ticketId) {
    try {
        // First confirmation
        const firstConfirm = confirm('⚠️ ATTENTION: Cette action supprimera définitivement ce ticket et tous ses messages.\n\nÊtes-vous sûr de vouloir continuer ?');
        if (!firstConfirm) return;

        // Second confirmation
        const secondConfirm = confirm('🚨 DERNIÈRE CONFIRMATION: Cette action est IRRÉVERSIBLE.\n\nConfirmez-vous la suppression définitive de ce ticket ?');
        if (!secondConfirm) return;

        console.log('🗑️ Deleting ticket:', ticketId);

        await callSecureEndpoint('delete-ticket', {
            ticketId
        });

        showNotification('Ticket supprimé définitivement', 'success');
        await loadTickets();
    } catch (error) {
        console.error('Error deleting ticket:', error);
        showNotification('Erreur lors de la suppression du ticket', 'error');
    }
}

// Open ticket chat modal
async function openTicketChat(ticketId) {
    try {
        console.log('🔍 Opening ticket chat for:', ticketId);
        console.log('📡 Supabase client initialized:', !!supabaseClient);
        console.log('👤 Current user:', currentUser?.id);

        // Check if we have a valid connection
        if (!supabaseClient) {
            throw new Error('Supabase client not initialized. Please refresh the page.');
        }

        // Check authentication
        if (!currentUser || !currentUser.id) {
            throw new Error('User not authenticated. Please sign in again.');
        }

        const { data: ticket, error } = await supabaseClient
            .from('tickets')
            .select(`
                *,
                messages (
                    id,
                    content,
                    sender_type,
                    sender_name,
                    sender_avatar,
                    created_at,
                    file_url,
                    file_name,
                    file_type,
                    file_size
                )
            `)
            .eq('id', ticketId)
            .single();

        if (error) {
            console.error('❌ Supabase error details:', error);
            throw error;
        }

        if (!ticket) {
            throw new Error('Ticket not found');
        }

        console.log('✅ Ticket loaded successfully:', ticket.id);

        currentTicketId = ticketId;

        // Update modal content
        document.getElementById('chat-ticket-title').textContent = ticket.title;
        document.getElementById('chat-ticket-status').textContent = ticket.status;
        document.getElementById('chat-ticket-status').className = `ticket-status ${ticket.status.toLowerCase().replace(' ', '-')}`;

        // Display messages
        displayChatMessages(ticket.messages || []);

        // Subscribe to real-time updates for this ticket
        subscribeToTicketMessages(ticketId);

        // Mark messages as read immediately when opening chat for all users
        // Don't pass timestamp - always query for the absolute latest to avoid missing messages
        await markMessagesAsRead(ticketId, currentUserDbId);

        // Show modal
        openModal('chat-modal');

        // Initialize typing indicators for this chat session
        initializeTypingIndicators(ticketId);

        // Mark messages as read when user scrolls to bottom
        initializeReadTracking(ticketId);
    } catch (error) {
        console.error('❌ Error opening ticket chat:', error);
        
        // Provide more specific error messages
        let errorMessage = 'Erreur lors de l\'ouverture du chat';
        
        if (error.message?.includes('not initialized')) {
            errorMessage = 'Connexion perdue. Veuillez rafraîchir la page.';
        } else if (error.message?.includes('not authenticated')) {
            errorMessage = 'Session expirée. Veuillez vous reconnecter.';
        } else if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
            errorMessage = 'Problème de connexion. Vérifiez votre connexion internet et réessayez.';
        }
        
        showNotification(errorMessage, 'error');
    }
}

// Load messages for a specific ticket
async function loadMessagesForTicket(ticketId) {
    try {
        console.log('💬 Loading messages for ticket:', ticketId);

        // Fetch messages from database
        const { data: messages, error } = await supabaseClient
            .from('messages')
            .select('*')
            .eq('ticket_id', ticketId)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error loading messages:', error);
            throw error;
        }

        console.log('💬 Loaded', messages?.length || 0, 'messages for ticket:', ticketId);

        // Display messages in chat
        displayChatMessages(messages || []);
    } catch (error) {
        console.error('Error in loadMessagesForTicket:', error);
        showNotification('Erreur lors du chargement des messages', 'error');
    }
}

// Display a single message in the chat (for real-time updates)
function displayMessageInChat(message) {
    console.log('💬 Displaying message in chat:', message.id);

    // Filter system messages: only show them to clients, hide from moderators and admins
    if (message.sender_type === 'system' && currentUserRole !== 'client') {
        console.log('🚫 Skipping system message for non-client user');
        return;
    }

    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) {
        console.log('⚠️ Messages container not found');
        return;
    }

    // Create message element
    const messageElement = createMessageElement(message);

    // Add to container
    messagesContainer.appendChild(messageElement);

    // Scroll to bottom
    setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);

    console.log('✅ Message displayed in chat');
}

// Display chat messages
async function displayChatMessages(messages) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    messagesContainer.innerHTML = '';

    // Filter system messages: only show them to clients, hide from moderators and admins
    const filteredMessages = messages.filter(message => {
        // If it's a system message and user is NOT a client, hide it
        if (message.sender_type === 'system' && currentUserRole !== 'client') {
            return false;
        }
        return true;
    });

    if (filteredMessages.length === 0) {
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

    // Get the last read timestamp for highlighting unread messages
    let lastReadTime = null;
    const { data: readData, error: readError } = await supabaseClient
        .from('ticket_reads')
        .select('last_read_at')
        .eq('ticket_id', currentTicketId)
        .eq('user_id', currentUserDbId)
        .maybeSingle(); // Use maybeSingle() instead of single() to handle 0 rows gracefully

    if (!readError && readData) {
        lastReadTime = new Date(readData.last_read_at);
    } else if (readError) {
        console.log('No read timestamp found (first time viewing ticket)');
    }

    let firstUnreadMessage = null;

    filteredMessages.forEach((message, index) => {
        const messageElement = createMessageElement(message);

        // Check if this is the first unread message
        const messageTime = new Date(message.created_at);
        if (!lastReadTime || messageTime > lastReadTime) {
            if (!firstUnreadMessage) {
                firstUnreadMessage = messageElement;
                // Add highlight class to the first unread message
                messageElement.classList.add('first-unread-message');
            }
        }

        messagesContainer.appendChild(messageElement);
    });

    // Scroll to bottom with smooth animation
    setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Mark messages as read after scrolling to bottom
        setTimeout(async () => {
            const isAtBottom = messagesContainer.scrollTop + messagesContainer.clientHeight >= messagesContainer.scrollHeight - 1;
            if (isAtBottom) {
                // For moderators, keep the scroll-based behavior
                // Clients already marked messages as read when opening the chat
                if (currentUserRole !== 'client') {
                    await markMessagesAsRead(currentTicketId, currentUserDbId);
                }
            }
        }, 100);
    }, 100);
}

// Get role configuration for styling and display
function getRoleConfig(role) {
    const roleConfigs = {
        'client': {
            label: 'Client',
            badgeClass: 'bg-blue-500',
            bgColor: 'bg-blue-100',
            icon: '👤'
        },
        'moderator': {
            label: 'Modérateur',
            badgeClass: 'bg-orange-500',
            bgColor: 'bg-orange-100',
            icon: '🛡️'
        },
        'admin': {
            label: 'Admin',
            badgeClass: 'bg-red-500',
            bgColor: 'bg-red-100',
            icon: '👑'
        }
    };

    return roleConfigs[role] || roleConfigs['client']; // Default to client if role not found
}

// Force download a file from URL
async function downloadFile(url, filename) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the blob URL
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Error downloading file:', error);
        // Fallback to opening in new tab if download fails
        window.open(url, '_blank');
    }
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

    // Determine if this message should be right-aligned (only current user's messages)
    const isRightAligned = message.sender_type === currentUserRole;

    // Create sender info element
    const senderInfo = document.createElement('div');
    senderInfo.className = 'sender-info flex items-center space-x-2 mb-1';
    senderInfo.innerHTML = `
        <span class="text-sm font-medium text-slate-700 dark:text-slate-300">${message.sender_name || 'Utilisateur'}</span>
        <span class="text-xs px-2 py-0.5 rounded-full ${roleConfig.badgeClass} text-white">${roleConfig.label}</span>
    `;

    if (isRightAligned) {
        // Right-aligned bubble for current user's messages
        messageDiv.className = 'message-bubble user';

        // Create avatar element
        const avatarContainer = document.createElement('div');
        if (message.sender_avatar) {
            const avatarImg = document.createElement('img');
            avatarImg.src = message.sender_avatar;
            avatarImg.alt = 'Avatar';
            avatarImg.className = 'w-10 h-10 rounded-full object-cover';
            avatarImg.onerror = function() {
                this.style.display = 'none';
                this.nextElementSibling.style.display = 'flex';
            };
            avatarContainer.appendChild(avatarImg);

            const fallbackDiv = document.createElement('div');
            fallbackDiv.className = 'w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0';
            fallbackDiv.style.display = 'none';
            const fallbackSpan = document.createElement('span');
            fallbackSpan.className = 'text-sm';
            fallbackSpan.textContent = roleConfig.icon;
            fallbackDiv.appendChild(fallbackSpan);
            avatarContainer.appendChild(fallbackDiv);
        } else {
            avatarContainer.className = 'w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0';
            const avatarSpan = document.createElement('span');
            avatarSpan.className = 'text-sm';
            avatarSpan.textContent = roleConfig.icon;
            avatarContainer.appendChild(avatarSpan);
        }

        // Create message bubble container
        const bubbleContainer = document.createElement('div');
        bubbleContainer.className = 'bg-blue-500 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-md shadow-lg';

        // Create message paragraph (safe content)
        const messageParagraph = document.createElement('p');
        messageParagraph.className = 'text-sm';
        messageParagraph.textContent = message.content;
        bubbleContainer.appendChild(messageParagraph);

        // Add file attachment if present
        if (message.file_url) {
            const fileContainer = document.createElement('div');
            fileContainer.className = 'mt-2 pt-2 border-t border-blue-400';

            const isImage = message.file_type && message.file_type.startsWith('image/');
            
            if (isImage) {
                // Image preview with download button
                const imageWrapper = document.createElement('div');
                imageWrapper.className = 'relative group';
                
                const imgLink = document.createElement('a');
                imgLink.href = message.file_url;
                imgLink.target = '_blank';
                imgLink.rel = 'noopener noreferrer';
                
                const img = document.createElement('img');
                img.src = message.file_url;
                img.alt = message.file_name || 'Image';
                img.className = 'max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-opacity';
                img.loading = 'lazy';
                
                imgLink.appendChild(img);
                imageWrapper.appendChild(imgLink);
                
                // Download button
                const downloadBtn = document.createElement('button');
                downloadBtn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    downloadFile(message.file_url, message.file_name || 'image');
                };
                downloadBtn.className = 'absolute bottom-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all cursor-pointer';
                downloadBtn.title = 'Télécharger';
                downloadBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11" stroke="#4B5563" stroke-width="2"/><path d="M12 7v8m0 0l-3-3m3 3l3-3M7 16h10" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                imageWrapper.appendChild(downloadBtn);
                
                fileContainer.appendChild(imageWrapper);
            } else {
                // File download link
                const fileLink = document.createElement('button');
                fileLink.onclick = () => downloadFile(message.file_url, message.file_name || 'file');
                fileLink.className = 'flex items-center space-x-2 text-white hover:text-blue-100 transition-colors w-full text-left';
                
                const fileIcon = document.createElement('span');
                fileIcon.textContent = '📎';
                fileIcon.className = 'text-lg';
                
                const fileInfo = document.createElement('div');
                fileInfo.className = 'flex flex-col flex-1';
                
                const fileName = document.createElement('span');
                fileName.textContent = message.file_name || 'Fichier joint';
                fileName.className = 'text-sm font-medium';
                
                const fileSize = document.createElement('span');
                if (message.file_size) {
                    const sizeMB = (message.file_size / 1024 / 1024).toFixed(2);
                    const sizeKB = (message.file_size / 1024).toFixed(2);
                    fileSize.textContent = message.file_size > 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB`;
                } else {
                    fileSize.textContent = 'Cliquer pour télécharger';
                }
                fileSize.className = 'text-xs opacity-90';
                
                fileInfo.appendChild(fileName);
                fileInfo.appendChild(fileSize);
                
                const downloadIcon = document.createElement('span');
                downloadIcon.className = 'text-white';
                downloadIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="2"/><path d="M12 7v8m0 0l-3-3m3 3l3-3M7 16h10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                
                fileLink.appendChild(fileIcon);
                fileLink.appendChild(fileInfo);
                fileLink.appendChild(downloadIcon);
                fileContainer.appendChild(fileLink);
            }
            
            bubbleContainer.appendChild(fileContainer);
        }

        // Create flex container for bubble and avatar
        const flexContainer = document.createElement('div');
        flexContainer.className = 'flex items-end space-x-2';
        flexContainer.appendChild(bubbleContainer);
        flexContainer.appendChild(avatarContainer);

        // Create main container
        const mainContainer = document.createElement('div');
        mainContainer.className = 'flex flex-col items-end space-y-1';
        mainContainer.appendChild(senderInfo);
        mainContainer.appendChild(flexContainer);

        // Create timestamp
        const timestampDiv = document.createElement('div');
        timestampDiv.className = 'text-right text-xs text-gray-500 mt-1';
        timestampDiv.textContent = timeString;

        // Append to message div
        messageDiv.appendChild(mainContainer);
        messageDiv.appendChild(timestampDiv);
    } else {
        // Left-aligned bubble for others
        messageDiv.className = 'message-bubble other';
        const bubbleClass = 'bg-white border border-gray-200 text-gray-900';

        // Create avatar element
        const avatarContainer = document.createElement('div');
        if (message.sender_avatar) {
            const avatarImg = document.createElement('img');
            avatarImg.src = message.sender_avatar;
            avatarImg.alt = 'Avatar';
            avatarImg.className = 'w-10 h-10 rounded-full object-cover';
            avatarImg.onerror = function() {
                this.style.display = 'none';
                this.nextElementSibling.style.display = 'flex';
            };
            avatarContainer.appendChild(avatarImg);

            const fallbackDiv = document.createElement('div');
            fallbackDiv.className = 'w-10 h-10 ' + roleConfig.bgColor + ' rounded-full flex items-center justify-center flex-shrink-0';
            fallbackDiv.style.display = 'none';
            const fallbackSpan = document.createElement('span');
            fallbackSpan.className = 'text-sm';
            fallbackSpan.textContent = roleConfig.icon;
            fallbackDiv.appendChild(fallbackSpan);
            avatarContainer.appendChild(fallbackDiv);
        } else {
            avatarContainer.className = 'w-10 h-10 ' + roleConfig.bgColor + ' rounded-full flex items-center justify-center flex-shrink-0';
            const avatarSpan = document.createElement('span');
            avatarSpan.className = 'text-sm';
            avatarSpan.textContent = roleConfig.icon;
            avatarContainer.appendChild(avatarSpan);
        }

        // Create message bubble container
        const bubbleContainer = document.createElement('div');
        bubbleContainer.className = bubbleClass + ' px-4 py-3 rounded-2xl rounded-bl-md max-w-md shadow-sm';

        // Create message paragraph (safe content)
        const messageParagraph = document.createElement('p');
        messageParagraph.className = 'text-sm';
        messageParagraph.textContent = message.content;
        bubbleContainer.appendChild(messageParagraph);

        // Add file attachment if present
        if (message.file_url) {
            const fileContainer = document.createElement('div');
            fileContainer.className = 'mt-2 pt-2 border-t border-gray-200';

            const isImage = message.file_type && message.file_type.startsWith('image/');
            
            if (isImage) {
                // Image preview with download button
                const imageWrapper = document.createElement('div');
                imageWrapper.className = 'relative group';
                
                const imgLink = document.createElement('a');
                imgLink.href = message.file_url;
                imgLink.target = '_blank';
                imgLink.rel = 'noopener noreferrer';
                
                const img = document.createElement('img');
                img.src = message.file_url;
                img.alt = message.file_name || 'Image';
                img.className = 'max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-opacity';
                img.loading = 'lazy';
                
                imgLink.appendChild(img);
                imageWrapper.appendChild(imgLink);
                
                // Download button
                const downloadBtn = document.createElement('button');
                downloadBtn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    downloadFile(message.file_url, message.file_name || 'image');
                };
                downloadBtn.className = 'absolute bottom-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all cursor-pointer';
                downloadBtn.title = 'Télécharger';
                downloadBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11" stroke="#4B5563" stroke-width="2"/><path d="M12 7v8m0 0l-3-3m3 3l3-3M7 16h10" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                imageWrapper.appendChild(downloadBtn);
                
                fileContainer.appendChild(imageWrapper);
            } else {
                // File download link
                const fileLink = document.createElement('button');
                fileLink.onclick = () => downloadFile(message.file_url, message.file_name || 'file');
                fileLink.className = 'flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors w-full text-left';
                
                const fileIcon = document.createElement('span');
                fileIcon.textContent = '📎';
                fileIcon.className = 'text-lg';
                
                const fileInfo = document.createElement('div');
                fileInfo.className = 'flex flex-col flex-1';
                
                const fileName = document.createElement('span');
                fileName.textContent = message.file_name || 'Fichier joint';
                fileName.className = 'text-sm font-medium';
                
                const fileSize = document.createElement('span');
                if (message.file_size) {
                    const sizeMB = (message.file_size / 1024 / 1024).toFixed(2);
                    const sizeKB = (message.file_size / 1024).toFixed(2);
                    fileSize.textContent = message.file_size > 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB`;
                } else {
                    fileSize.textContent = 'Cliquer pour télécharger';
                }
                fileSize.className = 'text-xs text-gray-500';
                
                fileInfo.appendChild(fileName);
                fileInfo.appendChild(fileSize);
                
                const downloadIcon = document.createElement('span');
                downloadIcon.className = 'text-gray-700';
                downloadIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="2"/><path d="M12 7v8m0 0l-3-3m3 3l3-3M7 16h10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                
                fileLink.appendChild(fileIcon);
                fileLink.appendChild(fileInfo);
                fileLink.appendChild(downloadIcon);
                fileContainer.appendChild(fileLink);
            }
            
            bubbleContainer.appendChild(fileContainer);
        }

        // Create flex container for avatar and bubble
        const flexContainer = document.createElement('div');
        flexContainer.className = 'flex items-end space-x-2';
        flexContainer.appendChild(avatarContainer);
        flexContainer.appendChild(bubbleContainer);

        // Create main container
        const mainContainer = document.createElement('div');
        mainContainer.className = 'flex flex-col items-start space-y-1';
        mainContainer.appendChild(senderInfo);
        mainContainer.appendChild(flexContainer);

        // Create timestamp
        const timestampDiv = document.createElement('div');
        timestampDiv.className = 'text-left text-xs text-gray-500 mt-1 ml-12';
        timestampDiv.textContent = timeString;

        // Append to message div
        messageDiv.appendChild(mainContainer);
        messageDiv.appendChild(timestampDiv);
    }

    return messageDiv;
}

// Initialize read tracking for a ticket
function initializeReadTracking(ticketId) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    // Mark messages as read when user scrolls to bottom
    const markAsRead = async () => {
        // More reliable check for being at the bottom
        const isAtBottom = messagesContainer.scrollTop + messagesContainer.clientHeight >= messagesContainer.scrollHeight - 1;

        if (isAtBottom) {
            await markMessagesAsRead(ticketId, currentUserDbId);
        }
    };

    // Add scroll event listener
    messagesContainer.addEventListener('scroll', markAsRead);

    // DO NOT auto-trigger markAsRead here - it's already called explicitly in openTicketChat
    // This prevents race conditions where two markMessagesAsRead calls overwrite each other

    // Store the event listener so we can remove it later
    messagesContainer._markAsReadListener = markAsRead;
}

// Mark messages as read for a user and ticket
let markingAsReadLock = {};

async function markMessagesAsRead(ticketId, userId, providedTimestamp = null) {
    // Prevent concurrent calls for the same ticket to avoid race conditions
    const lockKey = `${ticketId}-${userId}`;
    if (markingAsReadLock[lockKey]) {
        console.log('⏳ Skipping markMessagesAsRead - already in progress for ticket:', ticketId);
        return;
    }

    markingAsReadLock[lockKey] = true;

    try {
        console.log('📖 Marking messages as read for ticket:', ticketId, 'user:', userId, 'providedTimestamp:', providedTimestamp);

        // Use server-side endpoint for marking messages as read
        await callSecureEndpoint('mark-messages-read', {
            ticketId,
            providedTimestamp
        });

        console.log('✅ Messages marked as read successfully');

        // Update the unread count in the ticket list (if visible)
        // Pass 0 as the count since we just marked everything as read
        await updateTicketUnreadIndicator(ticketId, 0);

        // Refresh the ticket list to ensure unread indicators are updated across all tickets
        // This is necessary because the real-time subscription only listens to ticket table changes,
        // not ticket_reads table changes
        console.log('🔄 Refreshing ticket list after marking messages as read');
        await loadTickets();
    } catch (error) {
        console.error('Error in markMessagesAsRead:', error);
    } finally {
        // Release the lock
        delete markingAsReadLock[lockKey];
    }
}

// Remove unread indicator for a specific ticket in the DOM
function removeUnreadIndicator(ticketId) {
    try {
        console.log('🗑️ Removing unread indicator for ticket:', ticketId);

        // Find the ticket row in the DOM
        const ticketRow = document.querySelector(`[data-ticket-id="${ticketId}"]`);
        if (!ticketRow) {
            console.log('⚠️ Ticket row not found in DOM for ticket:', ticketId);
            return;
        }

        // Find the title cell and its flex container
        const titleCell = ticketRow.querySelector('[data-title-cell]');
        if (!titleCell) {
            console.log('⚠️ Title cell not found for ticket:', ticketId);
            return;
        }

        // Find the flex container inside the title cell
        const flexContainer = titleCell.querySelector('.flex.items-center');
        if (!flexContainer) {
            console.log('⚠️ Flex container not found for ticket:', ticketId);
            return;
        }

        // Find existing unread indicator
        const existingIndicator = flexContainer.querySelector('.ml-2.flex.items-center');

        // Remove unread indicator if it exists
        if (existingIndicator) {
            existingIndicator.remove();
            console.log('✅ Removed unread indicator for ticket:', ticketId);
        } else {
            console.log('ℹ️ No unread indicator found for ticket:', ticketId);
        }
    } catch (error) {
        console.error('❌ Error removing ticket unread indicator:', error);
    }
}

// Update unread indicator for a specific ticket in the DOM
async function updateTicketUnreadIndicator(ticketId, knownUnreadCount = null) {
    try {
        console.log('🔄 Updating unread indicator for ticket:', ticketId);

        // Get the current unread count for this ticket
        // If knownUnreadCount is provided, use it (avoids race condition)
        const unreadCount = knownUnreadCount !== null ? knownUnreadCount : await getUnreadMessageCount(ticketId, currentUserDbId);
        console.log('🔄 Unread count for indicator update:', unreadCount);

        // Find the ticket row in the DOM
        const ticketRow = document.querySelector(`[data-ticket-id="${ticketId}"]`);
        if (!ticketRow) {
            console.log('⚠️ Ticket row not found in DOM for ticket:', ticketId);
            return;
        }

        // Find the title cell and its flex container
        const titleCell = ticketRow.querySelector('[data-title-cell]');
        if (!titleCell) {
            console.log('⚠️ Title cell not found for ticket:', ticketId);
            return;
        }

        // Find the flex container inside the title cell
        const flexContainer = titleCell.querySelector('.flex.items-center');
        if (!flexContainer) {
            console.log('⚠️ Flex container not found for ticket:', ticketId);
            return;
        }

        // Find existing unread indicator
        const existingIndicator = flexContainer.querySelector('.ml-2.flex.items-center');

        if (unreadCount > 0) {
            console.log('✅ Creating/updating unread indicator for ticket:', ticketId, 'count:', unreadCount);
            // Create or update unread indicator
            let indicatorElement = existingIndicator;
            if (!indicatorElement) {
                indicatorElement = document.createElement('div');
                indicatorElement.className = 'ml-2 flex items-center space-x-1';
                flexContainer.appendChild(indicatorElement);
            }

            indicatorElement.innerHTML = `
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    <span class="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                    ${unreadCount} message${unreadCount > 1 ? 's' : ''} non lu${unreadCount > 1 ? 's' : ''}
                </span>
            `;
        } else {
            console.log('🗑️ Removing unread indicator for ticket:', ticketId);
            // Remove unread indicator if it exists
            removeUnreadIndicator(ticketId);
        }

        console.log('✅ Updated unread indicator for ticket:', ticketId, 'count:', unreadCount);
    } catch (error) {
        console.error('❌ Error updating ticket unread indicator:', error);
    }
}

// Get unread message count for a ticket and user
async function getUnreadMessageCount(ticketId, userId) {
    try {
        if (DEBUG) {
            console.log('📊 Getting unread message count for ticket:', ticketId, 'user:', userId);
        }

        // First, try to get the last read timestamp
        let lastReadTimeString = null;
        const { data: readData, error: readError } = await supabaseClient
            .from('ticket_reads')
            .select('last_read_at')
            .eq('ticket_id', ticketId)
            .eq('user_id', userId)
            .maybeSingle(); // Use maybeSingle() to avoid 406 when no record exists

        if (readError) {
            // Actual database error - log and rethrow
            console.error('❌ Database error accessing ticket_reads:', readError);
            throw new Error(`Failed to access read timestamps: ${readError.message}`);
        } else if (!readData) {
            // No read timestamp exists - all messages are unread (normal case)
            lastReadTimeString = null;
            console.log('📖 No read timestamp found for ticket:', ticketId, 'user:', userId);
        } else {
            // Keep as string to preserve full precision (microseconds)
            lastReadTimeString = readData.last_read_at;
            console.log('📖 Found read timestamp (raw string):', lastReadTimeString, 'for ticket:', ticketId, 'user:', userId);
        }

        // Get all messages for debugging
        const { data: allMessages, error: allMsgError } = await supabaseClient
            .from('messages')
            .select('id, sender_id, sender_name, created_at')
            .eq('ticket_id', ticketId)
            .order('created_at', { ascending: false });

        if (DEBUG) {
            if (!allMsgError && allMessages) {
                console.log('📨 All messages in ticket:', allMessages.length, 'messages');
                console.log('📨 Messages from other users:', allMessages.filter(m => m.sender_id !== userId).length);
                if (lastReadTimeString) {
                    const unreadFromOthers = allMessages.filter(m => m.sender_id !== userId && m.created_at > lastReadTimeString);
                    console.log('📨 Unread messages from others (string comparison):', unreadFromOthers.length);
                    if (unreadFromOthers.length > 0) {
                        console.log('📨 First unread message timestamp:', unreadFromOthers[unreadFromOthers.length - 1].created_at);
                    }
                }
            }
        }

        // Get message count
        let unread_count = 0;
        if (lastReadTimeString) {
            // Count messages created after the last read time (excluding user's own messages)
            // Use the raw string to preserve full timestamp precision
            let query = supabaseClient
                .from('messages')
                .select('*', { count: 'exact', head: true })
                .eq('ticket_id', ticketId)
                .neq('sender_id', userId)
                .gt('created_at', lastReadTimeString);
            
            // Exclude system messages for moderators and admins
            if (currentUserRole !== 'client') {
                query = query.neq('sender_type', 'system');
            }
            
            const { count, error: msgError } = await query;

            if (msgError) {
                console.error('Error counting unread messages:', msgError);
                return 0;
            }
            unread_count = count || 0;
            if (DEBUG) {
                console.log('📊 Count (with lastReadTimeString):', unread_count, 'using timestamp:', lastReadTimeString);
            }
        } else {
            // No read timestamp exists, all messages are unread (excluding user's own messages)
            let query = supabaseClient
                .from('messages')
                .select('*', { count: 'exact', head: true })
                .eq('ticket_id', ticketId)
                .neq('sender_id', userId);
            
            // Exclude system messages for moderators and admins
            if (currentUserRole !== 'client') {
                query = query.neq('sender_type', 'system');
            }
            
            const { count, error: msgError } = await query;

            if (msgError) {
                console.error('Error counting total messages:', msgError);
                return 0;
            }
            unread_count = count || 0;
            if (DEBUG) {
                console.log('📊 Count (no lastReadTime):', unread_count);
            }
        }

        if (DEBUG) {
            console.log('📊 Final unread message count:', unread_count);
        }
        return unread_count;
    } catch (error) {
        console.error('Error in getUnreadMessageCount:', error);
        return 0;
    }
}

// Typing indicator variables
let typingTimeout = null;
let isTyping = false;
let typingChannel = null;

// Start typing indicator
function startTyping() {
    if (isTyping || !currentTicketId) return;

    isTyping = true;
    console.log('⌨️ Started typing in ticket:', currentTicketId);

    // Broadcast typing status to other users
    broadcastTypingStatus(true);

    // Clear any existing timeout
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }

    // Set timeout to stop typing after 3 seconds of inactivity
    typingTimeout = setTimeout(() => {
        stopTyping();
    }, 3000);
}

// Stop typing indicator
function stopTyping() {
    if (!isTyping) return;

    isTyping = false;
    console.log('⌨️ Stopped typing in ticket:', currentTicketId);

    // Broadcast typing status to other users
    broadcastTypingStatus(false);

    // Clear timeout
    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }
}

// Broadcast typing status to other users
function broadcastTypingStatus(typing) {
    if (!currentTicketId || !supabaseClient) return;

    console.log('📡 Broadcasting typing status:', typing, 'for ticket:', currentTicketId);

    try {
        // Use Supabase presence for typing indicators
        if (!typingChannel) {
            console.log('📡 Creating new typing channel for ticket:', currentTicketId);
            typingChannel = supabaseClient.channel(`typing-${currentTicketId}`);
        }

        if (typing) {
            console.log('📡 Sending typing event');
            // Broadcast that we're typing
            typingChannel.send({
                type: 'broadcast',
                event: 'typing',
                payload: {
                    user_id: currentUserDbId,
                    user_name: currentUser.fullName || currentUser.username || 'Utilisateur',
                    user_role: currentUserRole,
                    user_image: currentUser.imageUrl || null,
                    ticket_id: currentTicketId
                }
            });
        } else {
            console.log('📡 Sending stop_typing event');
            // Broadcast that we stopped typing
            typingChannel.send({
                type: 'broadcast',
                event: 'stop_typing',
                payload: {
                    user_id: currentUserDbId,
                    ticket_id: currentTicketId
                }
            });
        }
    } catch (error) {
        console.error('Error broadcasting typing status:', error);
    }
}

// Subscribe to typing indicators for a ticket
function subscribeToTypingIndicators(ticketId) {
    if (!supabaseClient) return;

    // Unsubscribe from previous typing channel
    if (typingChannel) {
        supabaseClient.removeChannel(typingChannel);
    }

    typingChannel = supabaseClient.channel(`typing-${ticketId}`)
        .on('broadcast', { event: 'typing' }, (payload) => {
            console.log('⌨️ Received typing event:', payload);
            if (payload.payload.user_id !== currentUserDbId) {
                showTypingIndicatorForUser(payload.payload);
            }
        })
        .on('broadcast', { event: 'stop_typing' }, (payload) => {
            console.log('⌨️ Received stop typing event:', payload);
            if (payload.payload.user_id !== currentUserDbId) {
                hideTypingIndicatorForUser(payload.payload.user_id);
            }
        })
        .subscribe();

    console.log('✅ Subscribed to typing indicators for ticket:', ticketId);
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

// Show typing indicator for a specific user
function showTypingIndicatorForUser(userData) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    // Remove existing typing indicator for this user
    const existingTyping = messagesContainer.querySelector(`.typing-indicator[data-user-id="${userData.user_id}"]`);
    if (existingTyping) return;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'message-bubble other typing-indicator';
    typingDiv.setAttribute('data-user-id', userData.user_id);

    // Get role config for the typing indicator
    const roleConfig = getRoleConfig(userData.user_role);

    // Get user avatar or fallback
    let avatarHtml = '';
    if (userData.user_image) {
        avatarHtml = `<img src="${userData.user_image}" alt="Avatar" class="w-10 h-10 rounded-full object-cover">`;
    } else {
        const userInitials = (userData.user_name || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        avatarHtml = `<div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">${userInitials}</div>`;
    }

    typingDiv.innerHTML = `
        <div class="flex flex-col space-y-1">
            <div class="flex items-center space-x-2">
                <span class="text-xs font-medium text-gray-600">${userData.user_name}</span>
                <span class="px-2 py-0.5 text-xs rounded-full ${roleConfig.badgeClass}">${roleConfig.label}</span>
            </div>
            <div class="flex items-end space-x-2">
                <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0">
                    ${avatarHtml}
                </div>
                <div class="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md max-w-md">
                    <div class="typing-dots">
                        <span class="animate-bounce"></span>
                        <span class="animate-bounce"></span>
                        <span class="animate-bounce"></span>
                    </div>
                </div>
            </div>
        </div>
    `;

    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Auto-hide typing indicator after 5 seconds (in case stop_typing event is missed)
    setTimeout(() => {
        hideTypingIndicatorForUser(userData.user_id);
    }, 5000);
}

// Hide typing indicator for a specific user
function hideTypingIndicatorForUser(userId) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    const typingIndicator = messagesContainer.querySelector(`.typing-indicator[data-user-id="${userId}"]`);
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Handle typing events from other participants
function handleTypingEvent(event) {
    console.log('⌨️ Received typing event:', event);

    if (event.event === 'typing') {
        console.log('⌨️ Showing typing indicator for user:', event.payload);
        showTypingIndicatorForUser(event.payload);
    } else if (event.event === 'stop_typing') {
        console.log('⌨️ Hiding typing indicator for user:', event.payload.user_id);
        hideTypingIndicatorForUser(event.payload.user_id);
    }
}

// Initialize typing indicators for a chat session
function initializeTypingIndicators(ticketId) {
    console.log('⌨️ Initializing typing indicators for ticket:', ticketId);

    // Create typing channel for this ticket
    typingChannel = supabaseClient.channel(`typing-${ticketId}`, {
        config: {
            presence: {
                key: currentUser.id
            }
        }
    });

    console.log('⌨️ Created typing channel, subscribing to events');

    // Listen for typing events
    typingChannel
        .on('broadcast', { event: 'typing' }, handleTypingEvent)
        .on('broadcast', { event: 'stop_typing' }, handleTypingEvent)
        .subscribe();

    console.log('⌨️ Subscribed to typing events');

    // Add input event listeners to message input
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        console.log('⌨️ Found message input, adding event listeners');
        messageInput.addEventListener('input', (e) => {
            if (e.target.value.trim().length > 0) {
                startTyping();
            } else {
                stopTyping();
            }
        });

        messageInput.addEventListener('keydown', (e) => {
            // Stop typing when Enter is pressed (message sent)
            if (e.key === 'Enter' && !e.shiftKey) {
                stopTyping();
            }
        });
    } else {
        console.log('⌨️ Message input not found!');
    }
}

// Cleanup typing indicators when closing chat
function cleanupTypingIndicators() {
    stopTyping();

    if (typingChannel) {
        typingChannel.unsubscribe();
        typingChannel = null;
    }

    // Hide any remaining typing indicators
    hideTypingIndicator();
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
        // Use server-side endpoint for sending messages
        await callSecureEndpoint('send-message', {
            ticketId: currentTicketId,
            content
        });

        // Clear input and reset height
        messageInput.value = '';
        messageInput.style.height = 'auto';
        updateCharacterCounter();

        // The message will be added to the UI via real-time subscription
        console.log('✅ Message sent successfully');
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
async function handleFileUpload(files) {
    if (!files || files.length === 0) return;

    if (!currentTicketId) {
        showNotification('Aucun ticket sélectionné', 'error');
        return;
    }

    for (const file of Array.from(files)) {
        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            showNotification(`Le fichier ${file.name} est trop volumineux (max 10MB)`, 'error');
            continue;
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            showNotification(`Type de fichier non supporté: ${file.name}`, 'error');
            continue;
        }

        try {
            showNotification(`Upload de ${file.name} en cours...`, 'info');

            // Generate unique file path: userId/ticketId/timestamp-filename
            const timestamp = Date.now();
            const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
            const filePath = `${currentUserDbId}/${currentTicketId}/${timestamp}-${sanitizedFileName}`;

            // Upload file to Supabase Storage
            const { data: uploadData, error: uploadError } = await supabaseClient.storage
                .from('ticket-attachments')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) {
                console.error('Upload error:', uploadError);
                throw new Error(`Erreur d'upload: ${uploadError.message}`);
            }

            // Get public URL
            const { data: { publicUrl } } = supabaseClient.storage
                .from('ticket-attachments')
                .getPublicUrl(filePath);

            console.log('✅ File uploaded successfully:', publicUrl);

            // Send message with file attachment
            await sendMessageWithAttachment(currentTicketId, file.name, publicUrl, file.type, file.size);

            showNotification(`${file.name} envoyé avec succès`, 'success');

        } catch (error) {
            console.error('❌ Error uploading file:', error);
            showNotification(`Erreur lors de l'upload: ${error.message}`, 'error');
        }
    }

    // Clear the file input
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.value = '';
    }
}

// Send message with file attachment
async function sendMessageWithAttachment(ticketId, fileName, fileUrl, fileType, fileSize) {
    try {
        // Get ticket info for notification
        const { data: ticket, error: ticketError } = await supabaseClient
            .from('tickets')
            .select('*')
            .eq('id', ticketId)
            .single();

        if (ticketError) throw ticketError;

        // Determine file type category for display
        let fileCategory = 'file';
        if (fileType.startsWith('image/')) {
            fileCategory = 'image';
        } else if (fileType === 'application/pdf') {
            fileCategory = 'pdf';
        }

        // Create message content
        const content = `📎 Fichier envoyé: ${fileName}`;

        // Insert message with file attachment
        const { data: message, error: messageError } = await supabaseClient
            .from('messages')
            .insert([{
                ticket_id: ticketId,
                content: content,
                sender_type: currentUserRole,
                sender_name: currentUser.fullName || currentUser.username || 'Utilisateur',
                sender_id: currentUserDbId,
                sender_avatar: currentUser.imageUrl || null,
                file_url: fileUrl,
                file_name: fileName,
                file_type: fileType,
                file_size: fileSize
            }])
            .select()
            .single();

        if (messageError) throw messageError;

        console.log('✅ Message with attachment sent:', message);

        // The real-time subscription will handle displaying the message
        // No need to manually append it here

    } catch (error) {
        console.error('❌ Error sending message with attachment:', error);
        throw error;
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
            
            // Log status changes for debugging
            if (payload.eventType === 'UPDATE' && payload.old && payload.new) {
                if (payload.old.status !== payload.new.status) {
                    console.log(`🎫 Ticket ${payload.new.id} status changed: ${payload.old.status} → ${payload.new.status}`);
                }
                if (payload.old.assigned_to !== payload.new.assigned_to) {
                    console.log(`🎫 Ticket ${payload.new.id} assignment changed: ${payload.old.assigned_to} → ${payload.new.assigned_to}`);
                }
            }

            // Check if this ticket update affects the current user's view
            const shouldReload = checkIfTicketAffectsCurrentUser(payload);

            if (shouldReload) {
                console.log('🎫 Ticket update affects current user, reloading tickets...');
                
                // Special handling for clients when their ticket gets assigned
                if (currentUserRole === 'client' && payload.eventType === 'UPDATE') {
                    const oldTicket = payload.old;
                    const newTicket = payload.new;
                    
                    // Check if the ticket was just assigned (from unassigned to assigned)
                    if ((!oldTicket.assigned_to || oldTicket.assigned_to_name === null) && 
                        newTicket.assigned_to && newTicket.assigned_to_name) {
                        console.log('🎫 Client ticket just got assigned:', newTicket.id, 'to', newTicket.assigned_to_name);
                        showNotification(`Votre ticket "${newTicket.title}" a été assigné à ${newTicket.assigned_to_name}`, 'success');
                    }
                }
                
                loadTickets();
            }
        })
        .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'messages'
        }, async (payload) => {
            console.log('💬 Global message notification:', payload.new);
            console.log('💬 Message sender:', payload.new.sender_id, 'Current user DB ID:', currentUserDbId);

            // Check if this message is for a ticket the current user has access to
            const hasAccess = await checkIfUserHasAccessToTicket(payload.new.ticket_id);
            console.log('💬 User has access to ticket:', hasAccess);

            if (hasAccess && payload.new.sender_id !== currentUserDbId) {
                console.log('✅ Showing notification and updating unread indicator for ticket:', payload.new.ticket_id);
                // Show notification for new message
                showMessageNotification(payload.new);
                playNotificationSound();

                // Update unread counts in ticket list for the specific ticket
                await updateTicketUnreadIndicator(payload.new.ticket_id);
            } else {
                console.log('⏭️ Skipping notification - either no access or own message');
            }
        })
        .on('postgres_changes', {
            event: '*', // Listen to INSERT, UPDATE, DELETE on ticket_reads
            schema: 'public',
            table: 'ticket_reads'
        }, async (payload) => {
            console.log('📖 Real-time ticket_reads update:', payload.eventType, payload.new || payload.old);
            
            // When ticket_reads table changes, update the unread indicator for the affected ticket
            const ticketId = payload.new?.ticket_id || payload.old?.ticket_id;
            if (ticketId) {
                console.log('📖 Updating unread indicator for ticket:', ticketId, 'due to ticket_reads change');
                await updateTicketUnreadIndicator(ticketId);
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

            // Display the message in the chat (for all users, including sender)
            displayMessageInChat(payload.new);

            // Check if user is at bottom to mark messages as read
            const messagesContainer = document.getElementById('chat-messages');
            if (messagesContainer) {
                requestAnimationFrame(async () => {
                    // Wait for browser to settle and recompute isAtBottom
                    await new Promise(resolve => setTimeout(resolve, 0));
                    const isAtBottom = messagesContainer.scrollTop + messagesContainer.clientHeight >= messagesContainer.scrollHeight - 1;
                    
                    if (isAtBottom && !window.isMarkingRead) {
                        window.isMarkingRead = true;
                        console.log('📖 User is at bottom after new message, marking messages as read');
                        try {
                            await markMessagesAsRead(ticketId, currentUserDbId);
                        } finally {
                            window.isMarkingRead = false;
                        }
                    }
                });
            }

            // Hide typing indicator if it was showing
            hideTypingIndicatorForUser(payload.new.sender_id);

            // Show notification and play sound for new messages from other users
            const isFromOtherUser = payload.new.sender_id !== currentUserDbId;
            if (isFromOtherUser) {
                showMessageNotification(payload.new);
                playNotificationSound();
            }
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
            return ticket.assigned_to === currentUserDbId;
        }
    } else if (currentUserRole === 'admin') {
        // Admins care about all ticket changes
        return true;
    }

    return false;
}

// Check if user has access to a ticket for message notifications
async function checkIfUserHasAccessToTicket(ticketId) {
    if (!currentUser || !ticketId) return false;

    try {
        let hasAccess = false;

        if (currentUserRole === 'client') {
            // Clients only have access to their own tickets
            const { data: ticket, error } = await supabaseClient
                .from('tickets')
                .select('client_id')
                .eq('id', ticketId)
                .single();

            if (!error && ticket) {
                hasAccess = ticket.client_id === currentUser.id;
            }
        } else if (currentUserRole === 'moderator') {
            // Moderators have access to tickets assigned to them or open tickets
            const { data: ticket, error } = await supabaseClient
                .from('tickets')
                .select('assigned_to, status')
                .eq('id', ticketId)
                .single();

            if (!error && ticket) {
                hasAccess = ticket.assigned_to === currentUser.id || ticket.status === 'open';
            }
        } else if (currentUserRole === 'admin') {
            // Admins have access to all tickets
            hasAccess = true;
        }

        return hasAccess;
    } catch (error) {
        console.error('Error checking ticket access:', error);
        return false;
    }
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
            filterButtons = document.querySelectorAll('#admin-dashboard .segmented-control-item');
            break;
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
                                 (filterValue === 'closed' && statusText === 'fermé') ||
                                 (filterValue === 'escalated' && statusText === 'escaladé');
                row.style.display = shouldShow ? '' : 'none';
            }
        }
    });
}

// Load client statistics
async function loadClientStats() {
    try {
        console.log('📊 Loading client stats for user:', currentUserDbId, 'role:', currentUserRole);

        if (currentUserRole !== 'client') {
            console.log('📊 Skipping client stats - user is not a client');
            return;
        }

        // Get client's tickets (using Clerk ID, not database UUID)
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
        console.log('📊 Loading moderator stats for user:', currentUserDbId, 'role:', currentUserRole);

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
        const totalTicketsEl = document.getElementById('moderatorTotalTickets');
        const openTicketsEl = document.getElementById('moderatorOpenTickets');
        const inProgressTicketsEl = document.getElementById('moderatorInProgressTickets');
        const closedTicketsEl = document.getElementById('moderatorClosedTickets');

        if (totalTicketsEl) totalTicketsEl.textContent = assignedCount;
        if (openTicketsEl) openTicketsEl.textContent = openCount;
        if (inProgressTicketsEl) inProgressTicketsEl.textContent = inProgressCount;
        if (closedTicketsEl) closedTicketsEl.textContent = closedTodayCount;

        console.log('✅ Moderator stats loaded and UI updated successfully');
    } catch (error) {
        console.error('❌ Error loading moderator stats:', error);
        // Set defaults
        document.getElementById('moderatorTotalTickets').textContent = '0';
        document.getElementById('moderatorOpenTickets').textContent = '0';
        document.getElementById('moderatorInProgressTickets').textContent = '0';
        document.getElementById('moderatorClosedTickets').textContent = '0';
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

        // Check if supabaseClient is available
        if (!supabaseClient) {
            console.error('👥 Supabase client not available');
            showNotification('Erreur de connexion à la base de données', 'error');
            return;
        }

        // Check if current user is admin
        if (currentUserRole !== 'admin') {
            console.error('👥 User is not admin, cannot load users list');
            showNotification('Accès non autorisé', 'error');
            return;
        }

        // First, ensure current user's Discord info is up-to-date
        console.log('👥 Refreshing current user Discord info before loading users...');
        await refreshCurrentUserDiscordInfo();

        let { data: users, error } = await supabaseClient
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('👥 Database error:', error);
            throw error;
        }

        console.log('👥 Found', users?.length || 0, 'users:', users?.map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            discord_username: u.discord_username,
            discord_avatar: u.discord_avatar,
            hasAvatar: !!u.discord_avatar
        })));

        // Refresh Discord information for all users (not just current user)
        // This ensures avatars are up-to-date when viewing the user management table
        await refreshAllUsersDiscordInfo(users);

        // Reload users data after potential updates
        console.log('👥 Reloading users data after Discord info refresh...');
        const { data: updatedUsers, error: reloadError } = await supabaseClient
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });

        if (reloadError) {
            console.error('Error reloading users:', reloadError);
        } else {
            users = updatedUsers; // Use the updated data
            console.log('👥 Users data reloaded, found avatars:', users?.filter(u => u.discord_avatar).length);
        }

        const usersTableBody = document.getElementById('usersTableBody');
        if (!usersTableBody) {
            console.error('👥 Users table body not found');
            showNotification('Erreur d\'interface utilisateur', 'error');
            return;
        }

        usersTableBody.innerHTML = '';

        if (!users || users.length === 0) {
            console.log('👥 No users found, showing empty state');
            usersTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                        <div class="text-4xl mb-4">👥</div>
                        <p>Aucun utilisateur trouvé</p>
                        <p class="text-sm">La base de données ne contient aucun utilisateur.</p>
                    </td>
                </tr>
            `;
            updateUserTableInfo(0, 0);
            return;
        }

        console.log('👥 Creating user rows for', users.length, 'users');
        users.forEach(user => {
            const userRow = createUserTableRow(user);
            usersTableBody.appendChild(userRow);
        });

        updateUserTableInfo(users.length, users.length);
        console.log('👥 Users table loaded successfully');
    } catch (error) {
        console.error('❌ Error loading users:', error);
        showNotification('Erreur lors du chargement des utilisateurs: ' + error.message, 'error');

        // Show error state in table
        const usersTableBody = document.getElementById('usersTableBody');
        if (usersTableBody) {
            usersTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="px-6 py-12 text-center text-red-500 dark:text-red-400">
                        <div class="text-4xl mb-4">❌</div>
                        <p>Erreur de chargement</p>
                        <p class="text-sm">${error.message}</p>
                    </td>
                </tr>
            `;
        }
    }
}

// Load all moderators for admin assignment dropdown
async function loadAllModerators() {
    try {
        console.log('👥 Loading all moderators...');
        const { data: moderators, error } = await supabaseClient
            .from('users')
            .select('clerk_id, name, available') // Use clerk_id for consistency with assigned_to field
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

// Load available moderators for automatic assignment
async function loadAvailableModerators() {
    try {
        console.log('👥 Loading available moderators...');
        const { data: moderators, error } = await supabaseClient
            .from('users')
            .select('clerk_id, name, available') // Use clerk_id for ticket assignment queries
            .eq('role', 'moderator')
            .eq('available', true)
            .order('name');

        if (error) {
            console.error('👥 Error loading moderators:', error);
            throw error;
        }

        console.log('👥 Found', moderators?.length || 0, 'available moderators:', moderators);
        console.log('👥 Moderators details:', moderators?.map(m => ({ id: m.id, name: m.name, available: m.available })));
        return moderators || [];
    } catch (error) {
        console.error('👥 Error loading moderators:', error);
        return [];
    }
}

// Find an available moderator for ticket assignment
async function findAvailableModerator() {
    try {
        console.log('🔍 Finding available moderator...');
        
        // Get all available moderators
        const availableModerators = await loadAvailableModerators();
        
        if (availableModerators.length === 0) {
            console.log('⚠️ No available moderators found');
            return null;
        }
        
        // For now, use round-robin assignment (could be improved with load balancing)
        // Get the moderator with the least assigned tickets
        let selectedModerator = null;
        let minTickets = Infinity;
        
        for (const moderator of availableModerators) {
            const { data: assignedTickets, error } = await supabaseClient
                .from('tickets')
                .select('id', { count: 'exact' })
                .eq('assigned_to', moderator.clerk_id) // Use clerk_id to match assigned_to field
                .eq('status', 'in-progress');
            
            if (error) {
                console.error('Error counting tickets for moderator:', moderator.id, error);
                continue;
            }
            
            const ticketCount = assignedTickets?.length || 0;
            console.log('📊 Moderator', moderator.name, 'has', ticketCount, 'active tickets');
            
            if (ticketCount < minTickets) {
                minTickets = ticketCount;
                selectedModerator = moderator;
            }
        }
        
        console.log('✅ Selected moderator:', selectedModerator?.name, 'with', minTickets, 'active tickets');
        return selectedModerator;
    } catch (error) {
        console.error('❌ Error finding available moderator:', error);
        return null;
    }
}

// Create user table row for admin management
function createUserTableRow(user) {
    const row = document.createElement('tr');
    row.className = 'table-row';

    // Check if user is deactivated
    const isDeactivated = !user.active;
    if (isDeactivated) {
        row.className += ' opacity-50 bg-gray-50';
        row.style.opacity = '0.6';
    }

    // Get Discord information from database (now properly stored)
    const discordUsername = user.discord_username;
    const discordAvatar = user.discord_avatar || null;

    // Debug: Log avatar URL to see what we're getting
    if (discordAvatar) {
        console.log('🎨 Discord avatar URL for user', user.name, '(role:', user.role, '):', discordAvatar, 'Length:', discordAvatar.length);
    } else {
        console.log('🎨 No Discord avatar for user', user.name, '(role:', user.role, ') - using fallback');
    }

    // Also log the full user object for debugging
    console.log('👤 Full user object for', user.name, ':', {
        id: user.id,
        clerk_id: user.clerk_id,
        discord_username: user.discord_username,
        discord_avatar: user.discord_avatar,
        hasAvatar: !!user.discord_avatar,
        role: user.role,
        active: user.active
    });

    // Generate avatar HTML - use Discord avatar if available, otherwise fallback
    const userInitials = (user.name || user.email || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const avatarHtml = discordAvatar
        ? `<div class="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
            <img src="${discordAvatar}" alt="Avatar Discord" class="w-full h-full object-cover" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <div class="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold" style="display: none;">
                ${userInitials}
            </div>
           </div>`
        : `<div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            ${userInitials}
           </div>`;

    // Use actual availability from database for moderators/admins
    const isOnline = (user.role === 'moderator' || user.role === 'admin') ? user.available : false;
    const lastActivity = isOnline ? 'Disponible' : 'Indisponible';

    // Determine status display
    let statusDisplay = isOnline ? 'En ligne' : 'Hors ligne';
    let statusClass = isOnline ? 'status-online' : 'status-offline';
    if (isDeactivated) {
        statusDisplay = 'Désactivé';
        statusClass = 'status-offline'; // Use offline styling for deactivated
    }

    // Determine action button
    let actionButtonHtml = '';
    if (isDeactivated) {
        actionButtonHtml = `
            <button class="p-2 text-green-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors user-action-btn" data-action="reactivate" data-user-id="${user.id}" data-user-name="${user.name || user.email}" title="Réactiver le compte">
                <span class="material-icons-round text-lg">restore</span>
            </button>
        `;
    } else {
        actionButtonHtml = `
            <button class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors user-action-btn" data-action="delete" data-user-id="${user.id}" data-user-name="${user.name || user.email}" title="Désactiver le compte">
                <span class="material-icons-round text-lg">block</span>
            </button>
        `;
    }

    row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">
            <input type="checkbox" class="user-checkbox rounded border-slate-300 text-blue-600 focus:ring-blue-500" ${isDeactivated ? 'disabled' : ''}>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
                <div class="flex-shrink-0 w-10 h-10">
                    ${avatarHtml}
                </div>
                <div class="ml-4">
                    <div class="text-sm font-medium text-slate-900 dark:text-white">${user.name || 'Utilisateur'}</div>
                    <div class="text-sm text-slate-600 dark:text-slate-300 font-medium">${discordUsername ? '@' + discordUsername : '<span class="text-slate-400 italic">Aucun Discord</span>'}</div>
                </div>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-slate-900 dark:text-white">${user.email}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <select onchange="updateUserRole('${user.id}', this.value)" class="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500" ${isDeactivated ? 'disabled' : ''}>
                <option value="client" ${user.role === 'client' ? 'selected' : ''}>Client</option>
                <option value="moderator" ${user.role === 'moderator' ? 'selected' : ''}>Modérateur</option>
                <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
            </select>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
                <div class="status-indicator ${statusClass} mr-2"></div>
                <span class="text-sm text-slate-900 dark:text-white">${statusDisplay}</span>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
            ${lastActivity}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div class="flex items-center justify-center">
                ${actionButtonHtml}
            </div>
        </td>
    `;

    return row;
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

// Update user table info display
function updateUserTableInfo(displayed, total) {
    const infoElement = document.getElementById('userTableInfo');
    if (infoElement) {
        infoElement.textContent = `Affichage de ${displayed} utilisateurs sur ${total}`;
    }
}

// User management action functions
async function deleteUser(userId, userName) {
    const userDisplayName = userName || 'cet utilisateur';

    // Enhanced confirmation dialog
    const confirmation = confirm(
        `⚠️ DÉSACTIVATION DE COMPTE ⚠️\n\n` +
        `Vous êtes sur le point de désactiver le compte de "${userDisplayName}".\n\n` +
        `Cette action entraînera :\n` +
        `• Blocage de l'accès à l'Espace Client\n` +
        `• Conservation de toutes les données (tickets, messages)\n` +
        `• L'utilisateur ne pourra plus se connecter à l'application\n\n` +
        `⚠️ L'utilisateur conservera son compte Clerk,\n` +
        `mais ne pourra plus accéder à l'application.\n\n` +
        `Continuer la désactivation ?`
    );

    if (!confirmation) {
        return;
    }

    // Second confirmation for extra safety
    const secondConfirmation = confirm(
        `🔴 CONFIRMATION FINALE 🔴\n\n` +
        `Désactiver le compte de "${userDisplayName}" ?\n\n` +
        `L'utilisateur ne pourra plus accéder à l'application.`
    );

    if (!secondConfirmation) {
        return;
    }

    try {
        console.log('🚫 Starting user deactivation for:', userId, userDisplayName);

        // Set user as inactive
        const { error: deactivateError } = await supabaseClient
            .from('users')
            .update({ active: false })
            .eq('id', userId);

        if (deactivateError) {
            console.error('Error deactivating user:', deactivateError);
            throw new Error('Erreur lors de la désactivation de l\'utilisateur');
        }

        console.log('✅ User deactivated successfully:', userDisplayName);
        showNotification(`Utilisateur "${userDisplayName}" désactivé avec succès. Il ne pourra plus accéder à l'application.`, 'success');

        // Refresh the users list
        await loadUsersList();

    } catch (error) {
        console.error('❌ Error during user deactivation:', error);
        showNotification(`Erreur lors de la désactivation: ${error.message}`, 'error');
    }
}

// Reactivate a deactivated user
async function reactivateUser(userId, userName) {
    const userDisplayName = userName || 'cet utilisateur';

    const confirmation = confirm(
        `🔄 RÉACTIVATION DE COMPTE 🔄\n\n` +
        `Voulez-vous réactiver le compte de "${userDisplayName}" ?\n\n` +
        `L'utilisateur pourra à nouveau accéder à l'Espace Client.`
    );

    if (!confirmation) {
        return;
    }

    try {
        console.log('🔄 Starting user reactivation for:', userId, userDisplayName);

        // Set user as active
        const { error: reactivateError } = await supabaseClient
            .from('users')
            .update({ active: true })
            .eq('id', userId);

        if (reactivateError) {
            console.error('Error reactivating user:', reactivateError);
            throw new Error('Erreur lors de la réactivation de l\'utilisateur');
        }

        console.log('✅ User reactivated successfully:', userDisplayName);
        showNotification(`Utilisateur "${userDisplayName}" réactivé avec succès.`, 'success');

        // Refresh the users list
        await loadUsersList();

    } catch (error) {
        console.error('❌ Error during user reactivation:', error);
        showNotification(`Erreur lors de la réactivation: ${error.message}`, 'error');
    }
}

// Initialize user management modal functionality
function initializeUserManagement() {
    // Search functionality
    const searchInput = document.getElementById('userSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterUsers(this.value.toLowerCase().trim());
        });
    }

    // Refresh Discord avatars button
    const refreshDiscordAvatarsBtn = document.getElementById('refreshDiscordAvatarsBtn');
    if (refreshDiscordAvatarsBtn) {
        refreshDiscordAvatarsBtn.addEventListener('click', async function() {
            console.log('🔄 Manual refresh of Discord avatars requested');
            showNotification('Actualisation des avatars Discord en cours...', 'info');
            
            try {
                // First refresh current user's Discord info
                await refreshCurrentUserDiscordInfo();
                
                // Get current users list
                const { data: users, error } = await supabaseClient
                    .from('users')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                // Refresh Discord info for all users
                await refreshAllUsersDiscordInfo(users);

                // Reload the users table
                await loadUsersList();
                
                showNotification('Avatars Discord actualisés avec succès', 'success');
            } catch (error) {
                console.error('Error refreshing Discord avatars:', error);
                showNotification('Erreur lors de l\'actualisation des avatars', 'error');
            }
        });
    }

    // Select all checkbox
    const selectAllCheckbox = document.getElementById('selectAllUsers');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.user-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }

    // Download button
    const downloadBtn = document.getElementById('userDownloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            showNotification('Fonctionnalité d\'export en cours de développement', 'info');
        });
    }

    // Filter button
    const filterBtn = document.getElementById('userFilterBtn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            showNotification('Filtres avancés en cours de développement', 'info');
        });
    }

    // User action buttons (event delegation)
    const usersTableBody = document.getElementById('usersTableBody');
    if (usersTableBody) {
        usersTableBody.addEventListener('click', function(e) {
            const button = e.target.closest('.user-action-btn');
            if (!button) return;

            const action = button.dataset.action;
            const userId = button.dataset.userId;
            const userName = button.dataset.userName;

            if (action === 'reactivate') {
                reactivateUser(userId, userName);
            } else if (action === 'delete') {
                deleteUser(userId, userName);
            }
        });
    }
}

// Filter users based on search term
function filterUsers(searchTerm) {
    const tableBody = document.getElementById('usersTableBody');
    if (!tableBody) return;

    const rows = tableBody.querySelectorAll('tr');
    let visibleCount = 0;

    rows.forEach(row => {
        if (row.querySelector('td[colspan]')) return; // Skip empty state row

        const userName = row.querySelector('td:nth-child(2) .font-medium')?.textContent.toLowerCase() || '';
        const userEmail = row.querySelector('td:nth-child(3) .text-slate-900')?.textContent.toLowerCase() || '';
        const discordUsernameElement = row.querySelector('td:nth-child(2) .text-slate-600');
        const discordUsername = discordUsernameElement ? discordUsernameElement.textContent.toLowerCase().replace('@', '') : '';

        const matches = userName.includes(searchTerm) ||
                       userEmail.includes(searchTerm) ||
                       discordUsername.includes(searchTerm);

        row.style.display = matches || searchTerm === '' ? '' : 'none';
        if (matches || searchTerm === '') visibleCount++;
    });

    // Update info display
    const totalRows = rows.length - (tableBody.querySelector('td[colspan]') ? 1 : 0);
    updateUserTableInfo(visibleCount, totalRows);
}

// Initialize availability toggle for moderators
let availabilityToggleInitialized = false;

function initializeAvailabilityToggle() {
    // Prevent duplicate initialization
    if (availabilityToggleInitialized) {
        console.log('⏭️ Availability toggle already initialized, skipping');
        return;
    }

    const availabilityToggle = document.getElementById('availability-toggle');
    if (!availabilityToggle) {
        console.log('⚠️ Availability toggle not found');
        return;
    }

    console.log('🔄 Initializing availability toggle...');
    availabilityToggleInitialized = true;

    // Check if supabaseClient is available
    if (!supabaseClient) {
        console.log('⚠️ Supabase client not available yet, using localStorage fallback');
        // Fallback to localStorage only
        const isAvailable = localStorage.getItem('moderator_available') === 'true';
        availabilityToggle.checked = isAvailable;
        console.log('🔄 Loaded availability from localStorage:', isAvailable);
        return;
    }

    // Load current availability status from database first, then localStorage as fallback
    console.log('🔄 Loading availability for user:', currentUser?.id, 'role:', currentUserRole);
    supabaseClient
        .from('users')
        .select('available')
        .eq('clerk_id', currentUser.id)
        .single()
        .then(({ data, error }) => {
            console.log('🔄 Availability query result - data:', data, 'error:', error);
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
        console.log('🔄 Current user:', currentUser?.id);
        console.log('🔄 Current user role:', currentUserRole);

        // Disable the toggle to prevent double-clicks
        this.disabled = true;

        // Update localStorage immediately for UI responsiveness
        localStorage.setItem('moderator_available', available);

        // If supabaseClient is not available, skip database update
        if (!supabaseClient) {
            console.log('⚠️ Supabase client not available, skipping database update');
            showNotification(available ? 'Vous êtes maintenant disponible' : 'Vous êtes maintenant indisponible', 'info');
            this.disabled = false; // Re-enable toggle
            return;
        }

        try {
            console.log('🔄 Calling update-moderator-availability function for user:', currentUser.id);
            console.log('🔄 Setting availability to:', available);
            console.log('🔄 Request body:', { clerk_id: currentUser.id, available: available });

            // Call the update-moderator-availability Edge Function instead of direct DB update
            const { data, error } = await supabaseClient.functions.invoke('update-moderator-availability', {
                body: {
                    clerk_id: currentUser.id,
                    available: available
                }
            });

            console.log('🔄 Function response - data:', data);
            console.log('🔄 Function response - error:', error);

            if (error) {
                console.error('❌ Error calling update-moderator-availability function:', error);
                console.error('❌ Error details:', JSON.stringify(error, null, 2));
                showNotification('Erreur lors de la mise à jour de la disponibilité', 'error');
                // Revert localStorage if function call failed
                localStorage.setItem('moderator_available', !available);
                this.checked = !available;
                this.disabled = false; // Re-enable toggle
                return;
            }

            console.log('✅ Availability updated successfully via function:', data);
            showNotification(available ? 'Vous êtes maintenant disponible' : 'Vous êtes maintenant indisponible', 'info');

            // If this is an admin viewing, refresh the stats
            if (currentUserRole === 'admin') {
                loadAdminStats();
            }
        } catch (error) {
            console.error('❌ Error updating availability:', error);
            showNotification('Erreur lors de la mise à jour de la disponibilité', 'error');
            // Revert on error
            localStorage.setItem('moderator_available', !available);
            this.checked = !available;
        } finally {
            // Always re-enable the toggle
            this.disabled = false;
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
        console.log('👥 Current user role:', currentUserRole);
        console.log('👥 Current user:', currentUser);

        if (currentUserRole !== 'admin') {
            console.error('👥 Access denied: user is not admin');
            showNotification('Accès non autorisé - rôle administrateur requis', 'error');
            return;
        }

        openModal('userManagementModal');
        // Load users and initialize functionality when modal opens
        setTimeout(() => {
            console.log('👥 Initializing user management...');
            loadUsersList();
            initializeUserManagement();
        }, 100);
    });

    document.getElementById('viewAnalyticsBtn')?.addEventListener('click', function() {
        showNotification('Fonctionnalité d\'analytics en cours de développement', 'info');
    });

    // Test button for debugging
    document.getElementById('testModalBtn')?.addEventListener('click', function() {
        console.log('🧪 Test button clicked');
        console.log('🧪 Current user:', currentUser);
        console.log('🧪 Current user role:', currentUserRole);
        console.log('🧪 Supabase client:', !!supabaseClient);
        openModal('userManagementModal');
    });

    // Handle message form - only add listeners once
    // Note: No form element exists in HTML, message sending is handled by button click and Enter key
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

    // Internal notes functionality
    const internalNoteInput = document.getElementById('internalNoteInput');
    const addInternalNoteBtn = document.getElementById('addInternalNoteBtn');

    if (internalNoteInput && !internalNoteInput.hasAttribute('data-listener-attached')) {
        internalNoteInput.addEventListener('input', function() {
            updateNoteCharCounter();
        });

        internalNoteInput.addEventListener('change', function() {
            updateNoteCharCounter();
        });

        internalNoteInput.setAttribute('data-listener-attached', 'true');
    }

    if (addInternalNoteBtn && !addInternalNoteBtn.hasAttribute('data-listener-attached')) {
        addInternalNoteBtn.addEventListener('click', async function() {
            // Get the ticket ID from the modal context (we need to store it when opening the modal)
            const ticketId = this.getAttribute('data-ticket-id');
            if (ticketId) {
                await addInternalNote(ticketId);
            } else {
                showNotification('Erreur: ID du ticket manquant', 'error');
            }
        });

        addInternalNoteBtn.setAttribute('data-listener-attached', 'true');
    }

    // Mark as initialized
    window.modalHandlersInitialized = true;
    console.log('✅ Modal handlers initialized');
}

// Open modal
function openModal(modalId) {
    console.log('🔧 Opening modal:', modalId);
    console.log('🔧 Current user:', currentUser);
    console.log('🔧 Current user role:', currentUserRole);
    console.log('🔧 Supabase client available:', !!supabaseClient);

    const modal = document.getElementById(modalId);
    if (modal) {
        console.log('🔧 Modal element found, setting display to flex');
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Apply dimensions for chat modal
        if (modalId === 'chat-modal') {
            const modalContent = document.getElementById('chatModalContent');
            if (modalContent) {
                const savedSize = localStorage.getItem('chatModalSize') || 'medium';
                const sizes = {
                    small: { width: '560px', height: '580px' },
                    medium: { width: '950px', height: '870px' },
                    large: { width: '1500px', height: '870px' }
                };
                const dimensions = sizes[savedSize];
                modalContent.style.width = dimensions.width;
                modalContent.style.height = dimensions.height;
                modalContent.style.minWidth = dimensions.width;
                modalContent.style.minHeight = dimensions.height;
                modalContent.style.maxWidth = '90vw';
                modalContent.style.maxHeight = '85vh';
                modalContent.style.display = 'flex';
                modalContent.style.flexDirection = 'column';
                modalContent.style.flexGrow = '0';
                modalContent.style.flexShrink = '0';
                console.log('🔧 Applied chat modal dimensions:', dimensions);
            }
            
            // Initialize chat modal features (drag, resize, etc.)
            initializeChatModalFeatures();
        }
        
        console.log('🔧 Modal opened successfully');

        // If this is the user management modal, load users
        if (modalId === 'userManagementModal') {
            console.log('🔧 User management modal opened, loading users...');
            setTimeout(() => {
                loadUsersList();
                initializeUserManagement();
            }, 100);
        }
    } else {
        console.error('🔧 Modal element not found:', modalId);
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

        // Clean up scroll event listener for read tracking when closing chat modal
        if (modalId === 'chat-modal') {
            const messagesContainer = document.getElementById('chat-messages');
            if (messagesContainer && messagesContainer._markAsReadListener) {
                messagesContainer.removeEventListener('scroll', messagesContainer._markAsReadListener);
                delete messagesContainer._markAsReadListener;
            }
        }

        // Clean up typing indicators when closing chat modal
        if (modalId === 'chat-modal') {
            cleanupTypingIndicators();
        }
    }
}

// Toggle actions dropdown menu
function toggleActionsMenu(menuId) {
    console.log('🔧 toggleActionsMenu called with menuId:', menuId);

    // Close all other action menus first
    const allMenus = document.querySelectorAll('[id^="actions-menu-"]');
    allMenus.forEach(menu => {
        if (menu.id !== menuId) {
            menu.classList.add('hidden');
        }
    });

    // Toggle the clicked menu
    const menu = document.getElementById(menuId);
    console.log('🔧 Menu element found:', !!menu);

    if (menu) {
        const wasHidden = menu.classList.contains('hidden');
        console.log('🔧 Menu was hidden:', wasHidden, 'currentUserRole:', currentUserRole);

        if (wasHidden) {
            // Show the menu and position it
            menu.classList.remove('hidden');
            positionActionsMenu(menuId);
        } else {
            // Hide the menu
            menu.classList.add('hidden');
        }

        // If opening the menu and it's for admin, load moderators if not loaded
        if (wasHidden && currentUserRole === 'admin') {
            const assignSelect = menu.querySelector('.assign-select');

            if (assignSelect) {
                const hasOnlyPlaceholder = assignSelect.querySelector('option[value=""]') && assignSelect.options.length === 1;

                if (hasOnlyPlaceholder) {
                    console.log('👥 Loading moderators for menu:', menuId);
                    loadAllModerators().then(moderators => {
                        console.log('👥 Populating dropdown in menu', menuId, 'with', moderators.length, 'moderators');
                        assignSelect.innerHTML = '<option value="">Sélectionner un modérateur</option>';

                        moderators.forEach(moderator => {
                            const option = document.createElement('option');
                            option.value = moderator.clerk_id; // Use Clerk ID to match assigned_to field
                            option.textContent = moderator.name || 'Modérateur';
                            assignSelect.appendChild(option);
                        });

                        console.log('👥 Dropdown populated in menu', menuId);
                    }).catch(error => {
                        console.error('👥 Error loading moderators for menu', menuId, ':', error);
                    });
                }
            } else {
                console.error('🔧 Assign select not found in menu', menuId);
            }
        }
    } else {
        console.error('🔧 Menu element not found:', menuId);
    }
}

// Position the actions menu above the gear icon
function positionActionsMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (!menu) return;

    // Find the gear button that triggered this menu
    const gearButton = menu.previousElementSibling;
    if (!gearButton) return;

    // Get button and menu dimensions
    const buttonRect = gearButton.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Calculate available space
    const spaceAbove = buttonRect.top;
    const spaceBelow = viewportHeight - buttonRect.bottom;
    const menuHeight = menuRect.height || 200; // Estimate if not yet rendered

    // Reset any previous positioning
    menu.style.top = '';
    menu.style.bottom = '';
    menu.style.left = '';
    menu.style.right = '';

    // Position horizontally - center the menu on the button
    const menuWidth = menuRect.width || 192; // w-48 = 192px
    const leftPosition = buttonRect.left + (buttonRect.width / 2) - (menuWidth / 2);

    // Ensure menu doesn't go off-screen horizontally
    const finalLeft = Math.max(10, Math.min(leftPosition, viewportWidth - menuWidth - 10));
    menu.style.left = finalLeft + 'px';

    // Position vertically - prefer above, fallback to below
    if (spaceAbove >= menuHeight + 10) {
        // Enough space above - position above the button
        menu.style.bottom = (viewportHeight - buttonRect.top + 5) + 'px';
        menu.style.top = 'auto';
        console.log('📍 Positioning menu above button');
    } else if (spaceBelow >= menuHeight + 10) {
        // Enough space below - position below the button
        menu.style.top = (buttonRect.bottom + 5) + 'px';
        menu.style.bottom = 'auto';
        console.log('📍 Positioning menu below button');
    } else {
        // Not enough space in either direction - position above and let it scroll
        menu.style.bottom = (viewportHeight - buttonRect.top + 5) + 'px';
        menu.style.top = 'auto';
        console.log('📍 Positioning menu above button (limited space)');
    }

    // Ensure menu is visible by setting position fixed
    menu.style.position = 'fixed';
    menu.style.zIndex = '50';

    console.log('📍 Menu positioned:', {
        menuId,
        buttonTop: buttonRect.top,
        buttonBottom: buttonRect.bottom,
        spaceAbove,
        spaceBelow,
        menuHeight,
        finalLeft,
        position: menu.style.top !== 'auto' ? 'below' : 'above'
    });
}

// Close action menus when clicking outside
document.addEventListener('click', function(e) {
    // Don't close if clicking on a gear button or inside a menu
    if (e.target.closest('[id^="actions-menu-"]') || e.target.closest('button[title="Actions"]')) {
        return;
    }

    // Close all open action menus
    const allMenus = document.querySelectorAll('[id^="actions-menu-"]:not(.hidden)');
    allMenus.forEach(menu => {
        menu.classList.add('hidden');
    });
});

// Reposition menus on window resize
window.addEventListener('resize', function() {
    const openMenus = document.querySelectorAll('[id^="actions-menu-"]:not(.hidden)');
    openMenus.forEach(menu => {
        positionActionsMenu(menu.id);
    });
});

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

        // Search through all table cells except the last one (Actions column)
        const cells = row.querySelectorAll('td');
        let matches = false;

        // Check all cells except the last one (Actions)
        for (let i = 0; i < cells.length - 1; i++) {
            const cellText = cells[i].textContent.toLowerCase().trim();
            if (cellText.includes(searchTerm)) {
                matches = true;
                break;
            }
        }

        row.style.display = matches || searchTerm === '' ? '' : 'none';
    });
}

// Refresh Discord information for all users (not just current user)
// This ensures avatars are up-to-date when viewing the user management table
async function refreshAllUsersDiscordInfo(users) {
    console.log('🔄 Refreshing Discord info for all users...');

    // We can only update the current user's Discord info since we only have access to their Clerk data
    const currentUserRecord = users.find(u => u.clerk_id === currentUser.id);
    if (currentUserRecord && (!currentUserRecord.discord_username || !currentUserRecord.discord_avatar)) {
        console.log('🔄 Updating current user Discord info...');
        await updateUserDiscordInfo(currentUserRecord.id);
    }

    // For other users, we can't access their Discord data through Clerk
    // But we can try to get their avatar from recent messages if they have any
    for (const user of users) {
        if (!user.discord_avatar && user.clerk_id !== currentUser.id) {
            console.log('🔄 Trying to get avatar from messages for user:', user.name, '(ID:', user.clerk_id + ')');
            try {
                // Only look for messages in tickets the current user has access to
                const { data: recentMessage, error } = await supabaseClient
                    .from('messages')
                    .select('sender_avatar')
                    .eq('sender_id', user.clerk_id)
                    .not('sender_avatar', 'is', null)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .maybeSingle();

                if (!error && recentMessage?.sender_avatar) {
                    console.log('✅ Found avatar in messages for user:', user.name, recentMessage.sender_avatar);
                    const { error: updateError } = await supabaseClient
                        .from('users')
                        .update({ discord_avatar: recentMessage.sender_avatar })
                        .eq('id', user.id);

                    if (updateError) {
                        console.error('Error updating user avatar from messages:', updateError);
                    } else {
                        console.log('✅ Updated user avatar from messages for:', user.name);
                    }
                } else {
                    console.log('❌ No avatar found in messages for user:', user.name, 'Error:', error?.message);
                }
            } catch (error) {
                console.log('⚠️ Error checking messages for user:', user.name, error.message);
            }
        }
    }

    console.log('✅ Discord info refresh completed');
}

// Update Discord information for a specific user
async function updateUserDiscordInfo(userId) {
    try {
        console.log('🔄 Updating Discord info for user ID:', userId);

        // Get the user record
        const { data: userRecord, error: userError } = await supabaseClient
            .from('users')
            .select('clerk_id, discord_username, discord_avatar')
            .eq('id', userId)
            .single();

        if (userError) {
            console.error('Error fetching user record:', userError);
            return;
        }

        // Get Discord account from Clerk (only works for current user)
        if (userRecord.clerk_id === currentUser.id) {
            const discordAccount = currentUser.externalAccounts?.find(account => account.provider === 'discord');

            console.log('🔄 Full Discord account object for current user:', JSON.stringify(discordAccount, null, 2));
            console.log('🔄 Discord account properties:', discordAccount ? Object.keys(discordAccount) : 'No Discord account found');

            let avatarUrl = null;
            let username = null;

            if (discordAccount) {
                console.log('🔄 Found Discord account for current user:', discordAccount.username);
                console.log('🔄 Discord avatarUrl from Clerk:', discordAccount.avatarUrl);
                console.log('🔄 Discord providerUserId:', discordAccount.providerUserId);
                console.log('🔄 Discord id:', discordAccount.id);

                username = discordAccount.username;

                if (discordAccount.avatarUrl) {
                    avatarUrl = discordAccount.avatarUrl;
                    console.log('🔄 Using Clerk avatar URL directly:', avatarUrl);
                    if (!avatarUrl.startsWith('http')) {
                        // If it's just a hash, construct the full Discord CDN URL
                        const discordUserId = discordAccount.providerUserId || discordAccount.id;
                        if (discordUserId && avatarUrl) {
                            avatarUrl = `https://cdn.discordapp.com/avatars/${discordUserId}/${avatarUrl}.png`;
                            console.log('🔄 Constructed full Discord avatar URL:', avatarUrl);
                        }
                    }
                } else {
                    console.log('🔄 No avatarUrl found in Discord account');
                }
            } else {
                console.log('🔄 No Discord account found for current user');
            }

            // If no Discord avatar found, fall back to currentUser.imageUrl (which might be from another provider)
            if (!avatarUrl && currentUser.imageUrl) {
                avatarUrl = currentUser.imageUrl;
                console.log('🔄 Falling back to currentUser.imageUrl:', avatarUrl);
            }

            console.log('🔄 Final avatarUrl to save:', avatarUrl);
            console.log('🔄 Final username to save:', username);

            // Check if Discord info needs updating
            const needsUpdate = !userRecord.discord_username ||
                               !userRecord.discord_avatar ||
                               userRecord.discord_username !== username ||
                               userRecord.discord_avatar !== avatarUrl;

            if (needsUpdate) {
                console.log('🔄 Updating Discord info for user:', userRecord.clerk_id);
                const { error: updateError } = await supabaseClient
                    .from('users')
                    .update({
                        discord_username: username,
                        discord_avatar: avatarUrl
                    })
                    .eq('id', userId);

                if (updateError) {
                    console.error('Error updating Discord info:', updateError);
                } else {
                    console.log('✅ Discord info updated for user:', userRecord.clerk_id);
                }
            } else {
                console.log('🔄 Discord info already up-to-date for user:', userRecord.clerk_id);
            }
        } else {
            console.log('🔄 Cannot update Discord info for other users (only current user data available)');
        }
    } catch (error) {
        console.error('Error in updateUserDiscordInfo:', error);
    }
}

// Show notification to user
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${getNotificationClasses(type)}`;
    
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
                <span class="material-icons-round text-lg">${getNotificationIcon(type)}</span>
            </div>
            <div class="flex-1">
                <p class="text-sm font-medium">${message}</p>
            </div>
            <div class="flex-shrink-0">
                <button class="text-current hover:opacity-75" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <span class="material-icons-round text-sm">close</span>
                </button>
            </div>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Get notification CSS classes based on type
function getNotificationClasses(type) {
    const classes = {
        'success': 'bg-green-100 text-green-800 border border-green-200',
        'error': 'bg-red-100 text-red-800 border border-red-200',
        'warning': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        'info': 'bg-blue-100 text-blue-800 border border-blue-200'
    };
    return classes[type] || classes.info;
}

// Get notification icon based on type
function getNotificationIcon(type) {
    const icons = {
        'success': 'check_circle',
        'error': 'error',
        'warning': 'warning',
        'info': 'info'
    };
    return icons[type] || icons.info;
}

// Show message notification
function showMessageNotification(message) {
    const roleConfig = getRoleConfig(message.sender_type);
    const notificationMessage = `Nouveau message de ${message.sender_name} (${roleConfig.label})`;

    showNotification(notificationMessage, 'info');

    // Also show browser notification if permission is granted
    if ('Notification' in window && Notification.permission === 'granted') {
        // Check user preference for notification preview
        const notificationPreviewEnabled = localStorage.getItem('notificationPreviewEnabled') !== 'false'; // Default to true

        let notificationBody;
        if (notificationPreviewEnabled) {
            // Include truncated message preview
            notificationBody = message.content.length > 100 ? message.content.substring(0, 100) + '...' : message.content;
        } else {
            // Use generic message without content preview
            notificationBody = 'Nouveau message';
        }

        new Notification('Script Lua - Nouveau message', {
            body: notificationBody,
            icon: message.sender_avatar || '/favicon.ico',
            tag: `ticket-${message.ticket_id}`
        });
    }
}

// Play notification sound
function playNotificationSound() {
    // Check if audio is allowed (user has interacted with the page)
    if (!window.audioContextAllowed) {
        console.log('🔊 Audio not allowed yet - waiting for user interaction');
        return;
    }

    try {
        // Use existing audio context or create one
        if (!window.audioContext) {
            window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        const audioContext = window.audioContext;

        // Resume context if suspended (required in modern browsers)
        if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                playBeep(audioContext);
            }).catch(error => {
                console.log('Could not resume audio context:', error);
                fallbackAudio();
            });
        } else {
            playBeep(audioContext);
        }

        function playBeep(context) {
            try {
                const oscillator = context.createOscillator();
                const gainNode = context.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(context.destination);

                oscillator.frequency.setValueAtTime(800, context.currentTime);
                oscillator.frequency.setValueAtTime(600, context.currentTime + 0.1);

                gainNode.gain.setValueAtTime(0.3, context.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);

                oscillator.start(context.currentTime);
                oscillator.stop(context.currentTime + 0.3);
            } catch (error) {
                console.log('Error playing beep:', error);
                fallbackAudio();
            }
        }
    } catch (error) {
        console.log('Could not play notification sound:', error);
        fallbackAudio();
    }
}

function fallbackAudio() {
    try {
        const audio = new Audio('/notification.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {
            // Silently fail if audio file doesn't exist or autoplay is blocked
        });
    } catch (fallbackError) {
        // Silently fail
    }
}

// Initialize audio context on first user interaction
function initializeAudioContext() {
    if (window.audioContextAllowed) return;

    try {
        if (!window.audioContext) {
            window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Try to resume the context
        if (window.audioContext.state === 'suspended') {
            window.audioContext.resume().then(() => {
                window.audioContextAllowed = true;
                console.log('🔊 Audio context initialized and resumed');
            }).catch(error => {
                console.log('Could not resume audio context:', error);
            });
        } else {
            window.audioContextAllowed = true;
            console.log('🔊 Audio context initialized');
        }
    } catch (error) {
        console.log('Could not initialize audio context:', error);
    }
}

// Manual refresh of current user's Discord info
async function refreshCurrentUserDiscordInfo() {
    try {
        console.log('🔄 Manually refreshing current user Discord info...');

        if (!currentUser) {
            console.log('❌ No current user');
            return false;
        }

        const discordAccount = currentUser.externalAccounts?.find(account => account.provider === 'discord');
        let avatarUrl = null;
        let username = null;

        if (discordAccount) {
            console.log('🔄 Found Discord account:', discordAccount.username);

            username = discordAccount.username;

            if (discordAccount.avatarUrl) {
                avatarUrl = discordAccount.avatarUrl;
                if (!avatarUrl.startsWith('http')) {
                    const discordUserId = discordAccount.providerUserId || discordAccount.id;
                    if (discordUserId && avatarUrl) {
                        avatarUrl = `https://cdn.discordapp.com/avatars/${discordUserId}/${avatarUrl}.png`;
                        console.log('🔄 Constructed avatar URL:', avatarUrl);
                    }
                }
            }
        } else {
            console.log('❌ No Discord account linked');
        }

        // If no Discord avatar found, fall back to currentUser.imageUrl
        if (!avatarUrl && currentUser.imageUrl) {
            avatarUrl = currentUser.imageUrl;
            console.log('🔄 Falling back to currentUser.imageUrl:', avatarUrl);
        }

        // Update database
        const { error } = await supabaseClient
            .from('users')
            .update({
                discord_username: username,
                discord_avatar: avatarUrl
            })
            .eq('clerk_id', currentUser.id);

        if (error) {
            console.error('❌ Error updating Discord info:', error);
            showNotification('Erreur lors de la mise à jour des informations Discord', 'error');
            return false;
        }

        console.log('✅ Discord info updated successfully');
        showNotification('Informations Discord mises à jour avec succès', 'success');
        return true;
    } catch (error) {
        console.error('❌ Error in refreshCurrentUserDiscordInfo:', error);
        showNotification('Erreur lors de l\'actualisation des informations Discord', 'error');
        return false;
    }
}

// Show blocked access message for deactivated users
function showBlockedAccessMessage() {
    // Hide all dashboards first
    ['client-dashboard', 'moderator-dashboard', 'admin-dashboard'].forEach(id => {
        const dashboard = document.getElementById(id);
        if (dashboard) dashboard.style.display = 'none';
    });

    // Create blocked access overlay
    const blockedOverlay = document.createElement('div');
    blockedOverlay.id = 'blocked-access-overlay';
    blockedOverlay.className = 'fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50';
    
    blockedOverlay.innerHTML = `
        <div class="max-w-md w-full mx-4">
            <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 text-center">
                <div class="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span class="material-icons-round text-4xl text-red-600 dark:text-red-400">block</span>
                </div>
                <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                    Accès non autorisé
                </h2>
                <p class="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Votre compte a été désactivé. Vous ne pouvez plus accéder à l'Espace Client.
                </p>
                <p class="text-sm text-slate-500 dark:text-slate-500 mb-6">
                    Pour plus d'informations, contactez l'administrateur.
                </p>
                <div class="flex flex-col space-y-3">
                    <a href="https://discord.gg/C5FP62dRU3" target="_blank" 
                       class="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        <span class="material-icons-round">discord</span>
                        <span>Contacter l'administrateur</span>
                    </a>
                    <button onclick="window.location.href='index.html'" 
                            class="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-medium transition-colors">
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add to page
    document.body.appendChild(blockedOverlay);
}

// Export functions for global access
window.createTicket = createTicket;
window.updateTicketStatus = updateTicketStatus;
window.deleteTicket = deleteTicket;
window.updateTicketPriority = updateTicketPriority;
window.assignTicket = assignTicket;
window.openTicketChat = openTicketChat;
window.sendMessage = sendMessage;
window.updateUserRole = updateUserRole;
window.deleteUser = deleteUser;
window.reactivateUser = reactivateUser;
window.toggleActionsMenu = toggleActionsMenu;
window.openModal = openModal;
window.closeModal = closeModal;
window.showTicketDetails = showTicketDetails;

// Initialize the application after all functions are exported
async function initializeApp() {
    console.log('🚀 Initializing application...');

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            console.log('🔔 Notification permission:', permission);
        });
    }

    // Initialize modal handlers
    initializeModalHandlers();

    // Initialize search functionality
    initializeSearch();

    // Initialize audio context on first user interaction
    const initAudioOnInteraction = () => {
        initializeAudioContext();
        // Remove listeners after first interaction
        document.removeEventListener('click', initAudioOnInteraction);
        document.removeEventListener('keydown', initAudioOnInteraction);
        document.removeEventListener('touchstart', initAudioOnInteraction);
    };

    document.addEventListener('click', initAudioOnInteraction);
    document.addEventListener('keydown', initAudioOnInteraction);
    document.addEventListener('touchstart', initAudioOnInteraction);

    // Wait for ticketing system to be ready (or timeout after reasonable time)
    try {
        console.log('⏳ Waiting for ticketing system to be ready...');
        await Promise.race([
            ticketingSystemReady,
            new Promise(resolve => setTimeout(resolve, 5000)) // Timeout after 5 seconds
        ]);
        console.log('✅ Ticketing system initialization completed or timed out');
    } catch (error) {
        console.log('⚠️ Ticketing system initialization wait failed:', error);
    }
}

// ===================================================================
// INTERNAL NOTES FUNCTIONS
// ===================================================================

// Show ticket details modal with internal notes for staff
async function showTicketDetails(ticketId) {
    try {
        console.log('📋 Showing ticket details for:', ticketId);

        // Get ticket details
        const { data: ticket, error } = await supabaseClient
            .from('tickets')
            .select(`
                *,
                messages (
                    id,
                    content,
                    sender_type,
                    sender_name,
                    sender_avatar,
                    created_at,
                    file_url,
                    file_name,
                    file_type,
                    file_size
                )
            `)
            .eq('id', ticketId)
            .single();

        if (error) throw error;

        // Update modal title
        document.getElementById('ticketDetailsTitle').textContent = `Ticket #${ticket.id.substring(0, 8)}`;

        // Populate ticket details
        const detailsContent = document.getElementById('ticketDetailsContent');
        const createdDate = new Date(ticket.created_at).toLocaleString('fr-FR');
        const lastActivity = ticket.messages?.length > 0
            ? new Date(ticket.messages[ticket.messages.length - 1].created_at).toLocaleString('fr-FR')
            : 'Aucune activité';

        detailsContent.innerHTML = `
            <div class="space-y-6">
                <!-- Ticket Info -->
                <div class="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                    <h4 class="font-semibold text-slate-800 dark:text-white mb-3">Informations du ticket</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span class="font-medium text-slate-600 dark:text-slate-300">Sujet:</span>
                            <p class="text-slate-800 dark:text-white mt-1">${escapeHtml(ticket.title)}</p>
                        </div>
                        <div>
                            <span class="font-medium text-slate-600 dark:text-slate-300">Statut:</span>
                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                ticket.status === 'open' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                ticket.status === 'in-progress' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                                ticket.status === 'closed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            } mt-1">
                                ${ticket.status === 'in-progress' ? 'En cours' : ticket.status === 'escalated' ? 'Escaladé' : ticket.status}
                            </span>
                        </div>
                        <div>
                            <span class="font-medium text-slate-600 dark:text-slate-300">Créé le:</span>
                            <p class="text-slate-800 dark:text-white mt-1">${createdDate}</p>
                        </div>
                        <div>
                            <span class="font-medium text-slate-600 dark:text-slate-300">Dernière activité:</span>
                            <p class="text-slate-800 dark:text-white mt-1">${lastActivity}</p>
                        </div>
                        ${currentUserRole === 'admin' ? `
                        <div>
                            <span class="font-medium text-slate-600 dark:text-slate-300">Client:</span>
                            <p class="text-slate-800 dark:text-white mt-1">${escapeHtml(ticket.client_name || 'Inconnu')}</p>
                        </div>
                        <div>
                            <span class="font-medium text-slate-600 dark:text-slate-300">Assigné à:</span>
                            <p class="text-slate-800 dark:text-white mt-1">${escapeHtml(ticket.assigned_to_name || 'Non assigné')}</p>
                        </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Messages -->
                <div>
                    <h4 class="font-semibold text-slate-800 dark:text-white mb-3">Messages (${ticket.messages?.length || 0})</h4>
                    <div class="space-y-3 max-h-96 overflow-y-auto">
                        ${ticket.messages?.length > 0
                            ? ticket.messages.map(msg => `
                                <div class="bg-white dark:bg-slate-700 rounded-lg p-3 border border-slate-200 dark:border-slate-600">
                                    <div class="flex items-center justify-between mb-2">
                                        <div class="flex items-center space-x-2">
                                            <span class="font-medium text-slate-800 dark:text-white">${escapeHtml(msg.sender_name)}</span>
                                            <span class="px-2 py-0.5 text-xs rounded-full ${
                                                msg.sender_type === 'client' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                                msg.sender_type === 'moderator' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                                                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                            }">${msg.sender_type === 'client' ? 'Client' : msg.sender_type === 'moderator' ? 'Modérateur' : 'Admin'}</span>
                                        </div>
                                        <span class="text-xs text-slate-500 dark:text-slate-400">${new Date(msg.created_at).toLocaleString('fr-FR')}</span>
                                    </div>
                                    <p class="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap">${escapeHtml(msg.content)}</p>
                                    ${msg.file_url ? `
                                        <div class="mt-2 pt-2 border-t border-slate-200 dark:border-slate-600">
                                            <a href="${msg.file_url}" target="_blank" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm flex items-center">
                                                <span class="material-icons-round text-sm mr-1">attach_file</span>
                                                ${escapeHtml(msg.file_name || 'Fichier joint')}
                                            </a>
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')
                            : '<p class="text-slate-500 dark:text-slate-400 text-center py-8">Aucun message dans ce ticket.</p>'
                        }
                    </div>
                </div>
            </div>
        `;

        // Show internal notes section for staff only
        const notesSection = document.getElementById('internalNotesSection');
        if (currentUserRole === 'moderator' || currentUserRole === 'admin') {
            notesSection.style.display = 'block';
            await loadInternalNotes(ticketId);
            
            // Set ticket ID on the add button for the click handler
            const addBtn = document.getElementById('addInternalNoteBtn');
            if (addBtn) {
                addBtn.setAttribute('data-ticket-id', ticketId);
            }

            // Auto-scroll to make the notes section visible
            setTimeout(() => {
                const modal = document.getElementById('ticketDetailsModal');
                if (modal) {
                    modal.scrollTop = modal.scrollHeight;
                }
            }, 100);
        } else {
            notesSection.style.display = 'none';
        }

        // Show modal
        openModal('ticketDetailsModal');

    } catch (error) {
        console.error('Error showing ticket details:', error);
        showNotification('Erreur lors du chargement des détails du ticket', 'error');
    }
}

// Load internal notes for a ticket
async function loadInternalNotes(ticketId) {
    try {
        console.log('📝 Loading internal notes for ticket:', ticketId);

        const { data: notes, error } = await supabaseClient
            .from('internal_notes')
            .select('*')
            .eq('ticket_id', ticketId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        const notesList = document.getElementById('internalNotesList');

        if (!notes || notes.length === 0) {
            notesList.innerHTML = `
                <div class="text-center text-slate-500 dark:text-slate-400 py-8">
                    <p class="text-sm">Aucune note interne</p>
                </div>
            `;
            return;
        }

        notesList.innerHTML = notes.map(note => `
            <div class="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 p-4 mb-3" data-note-id="${note.id}">
                <div class="flex items-start justify-between mb-2">
                    <div class="flex items-center space-x-2">
                        <span class="text-xs font-medium text-slate-600 dark:text-slate-400">${escapeHtml(note.author_name)}</span>
                        <span class="text-xs text-slate-500 dark:text-slate-500">•</span>
                        <span class="text-xs text-slate-500 dark:text-slate-500">${new Date(note.created_at).toLocaleString('fr-FR')}</span>
                    </div>
                </div>
                <div class="note-content mb-3">
                    <p class="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">${escapeHtml(note.content)}</p>
                </div>
                <div class="note-actions flex items-center">
                    <button onclick="editInternalNote('${note.id}', '${escapeHtml(note.content).replace(/'/g, "\\'").replace(/"/g, '\\"')}')" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium mr-2">
                        <span class="material-icons-round text-sm mr-1">edit</span>
                        Modifier
                    </button>
                    <button onclick="deleteInternalNote('${note.id}')" class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium">
                        <span class="material-icons-round text-sm mr-1">delete</span>
                        Supprimer
                    </button>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading internal notes:', error);
        const notesList = document.getElementById('internalNotesList');
        notesList.innerHTML = `
            <div class="text-center text-red-500 dark:text-red-400 py-8">
                <p class="text-sm">Erreur lors du chargement des notes</p>
            </div>
        `;
    }
}

// Add internal note to a ticket
async function addInternalNote(ticketId) {
    const noteInput = document.getElementById('internalNoteInput');
    const content = noteInput.value.trim();

    if (!content) {
        showNotification('Veuillez saisir une note', 'error');
        return;
    }

    if (content.length > 500) {
        showNotification('La note est trop longue (maximum 500 caractères)', 'error');
        return;
    }

    try {
        console.log('📝 Adding internal note to ticket:', ticketId);

        // Use server-side endpoint for creating internal notes
        await callSecureEndpoint('create-internal-note', {
            ticketId,
            content
        });

        // Clear input and reload notes
        noteInput.value = '';
        updateNoteCharCounter();
        await loadInternalNotes(ticketId);

        showNotification('Note interne ajoutée', 'success');

    } catch (error) {
        console.error('Error adding internal note:', error);
        showNotification('Erreur lors de l\'ajout de la note', 'error');
    }
}

// Update character counter for internal note input
function updateNoteCharCounter() {
    const noteInput = document.getElementById('internalNoteInput');
    const charCounter = document.getElementById('noteCharCounter');
    const maxLength = 500;

    if (!noteInput || !charCounter) return;

    const currentLength = noteInput.value.length;
    charCounter.textContent = `${currentLength}/${maxLength}`;

    // Update styling based on character count
    charCounter.classList.remove('text-orange-500', 'text-red-500');

    if (currentLength > maxLength * 0.8) {
        charCounter.classList.add('text-orange-500');
    }

    if (currentLength > maxLength) {
        charCounter.classList.add('text-red-500');
    }

    // Disable add button if over limit
    const addBtn = document.getElementById('addInternalNoteBtn');
    if (addBtn) {
        addBtn.disabled = currentLength > maxLength || currentLength === 0;
    }
}

// ===================================================================
// APP INITIALIZATION
// ===================================================================

// Call initializeApp when the script loads
initializeApp();

// Initialize chat modal features after DOM is ready
function initializeChatModalFeatures() {
    const modal = document.getElementById('chat-modal');
    const modalContent = document.getElementById('chatModalContent');
    const header = document.getElementById('chatModalHeader');
    const sizeButtons = document.querySelectorAll('.chat-size-btn');
    
    if (!modal || !modalContent || !header) {
        console.log('⚠️ Chat modal elements not found, skipping drag/resize initialization');
        return;
    }
    
    // Load saved preferences
    const savedSize = localStorage.getItem('chatModalSize') || 'medium';
    const savedPosition = JSON.parse(localStorage.getItem('chatModalPosition') || '{"x": 0, "y": 0}');
    
    // Define exact dimensions for each size
    const sizes = {
        small: { width: '560px', height: '580px' },
        medium: { width: '950px', height: '870px' },
        large: { width: '1500px', height: '870px' }
    };
    
    // Apply saved size
    modalContent.classList.remove('chat-size-small', 'chat-size-medium', 'chat-size-large');
    modalContent.classList.add(`chat-size-${savedSize}`);
    
    // Force dimensions with inline styles
    const savedDimensions = sizes[savedSize];
    modalContent.style.width = savedDimensions.width;
    modalContent.style.height = savedDimensions.height;
    modalContent.style.minWidth = savedDimensions.width;
    modalContent.style.minHeight = savedDimensions.height;
    modalContent.style.maxWidth = '90vw';
    modalContent.style.maxHeight = '85vh';
    modalContent.style.display = 'flex';
    modalContent.style.flexDirection = 'column';
    modalContent.style.flexGrow = '0';
    modalContent.style.flexShrink = '0';
    
    sizeButtons.forEach(btn => {
        if (btn.dataset.size === savedSize) {
            btn.classList.add('bg-white/20');
        } else {
            btn.classList.remove('bg-white/20');
        }
    });
    
    // Size button handlers
    sizeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const size = button.dataset.size;
            
            // Define exact dimensions for each size
            const sizes = {
                small: { width: '560px', height: '580px' },
                medium: { width: '950px', height: '870px' },
                large: { width: '1500px', height: '870px' }
            };
            
            // Update button states
            sizeButtons.forEach(btn => btn.classList.remove('bg-white/20'));
            button.classList.add('bg-white/20');
            
            // Update modal size classes
            modalContent.classList.remove('chat-size-small', 'chat-size-medium', 'chat-size-large');
            modalContent.classList.add(`chat-size-${size}`);
            
            // Force dimensions with inline styles to override everything
            const dimensions = sizes[size];
            modalContent.style.width = dimensions.width;
            modalContent.style.height = dimensions.height;
            modalContent.style.minWidth = dimensions.width;
            modalContent.style.minHeight = dimensions.height;
            modalContent.style.maxWidth = '90vw';
            modalContent.style.maxHeight = '85vh';
            modalContent.style.display = 'flex';
            modalContent.style.flexDirection = 'column';
            modalContent.style.flexGrow = '0';
            modalContent.style.flexShrink = '0';
            
            // Reset position to center when changing size
            xOffset = 0;
            yOffset = 0;
            modalContent.style.transform = 'translate(0, 0)';
            localStorage.setItem('chatModalPosition', JSON.stringify({ x: 0, y: 0 }));
            
            // Save size preference
            localStorage.setItem('chatModalSize', size);
            
            // Debug logging
            console.log(`📐 Chat modal size changed to: ${size}`);
            console.log(`📏 Set dimensions: ${dimensions.width} x ${dimensions.height}`);
            console.log(`📏 Current classes:`, modalContent.className);
            console.log(`📏 Computed width:`, window.getComputedStyle(modalContent).width);
            console.log(`📏 Computed height:`, window.getComputedStyle(modalContent).height);
        });
    });
    
    // Dragging functionality
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = savedPosition.x;
    let yOffset = savedPosition.y;
    
    // Apply saved position
    if (xOffset !== 0 || yOffset !== 0) {
        modalContent.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    }
    
    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    function dragStart(e) {
        // Don't drag if clicking on buttons
        if (e.target.closest('button')) return;
        
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        isDragging = true;
        header.classList.add('dragging');
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            
            modalContent.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }
    }
    
    function dragEnd() {
        if (isDragging) {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
            header.classList.remove('dragging');
            
            // Save position
            localStorage.setItem('chatModalPosition', JSON.stringify({ x: xOffset, y: yOffset }));
        }
    }
    
    // Reset position when modal closes
    const closeButton = document.getElementById('closeChatModal');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            // Reset position after a short delay to allow close animation
            setTimeout(() => {
                xOffset = 0;
                yOffset = 0;
                modalContent.style.transform = 'translate(0, 0)';
                localStorage.setItem('chatModalPosition', JSON.stringify({ x: 0, y: 0 }));
            }, 300);
        });
    }
    
    console.log('✅ Chat modal drag and resize features initialized');
}

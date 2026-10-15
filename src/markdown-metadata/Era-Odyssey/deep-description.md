# Era Odyssey Companion Website

## The public face of an educational game

This repository is the website for Era Odyssey, a high-school team project made for a learning technology competition. The associated Unity game teaches about geological time while players fight creatures, gather materials, craft equipment, develop elemental skills, and answer questions. The website gives that game a browsable story and information layer. It is not the Unity runtime: gameplay systems and persistence are in `Unity-EraOdesey`.

The site has seven linked areas. Home introduces protagonist Demain H. Cover, the research island Saxabra, and the Si-2505 device that sends him into Earth's past. Monster shows creatures; Information presents educational/background material; Gallery organizes game imagery by period; Animation showcases motion assets; About documents the team; and Play points visitors to game files and an APK. Together these pages give the project context beyond a downloadable executable, making its narrative world, creatures, geological setting, and creators visible.

## Implementation and relationship to the game

The website uses static HTML, CSS, JavaScript, JSON, and image assets under `assets/`. Root `index.html` redirects to `assets/Home.html`. Page links and asset paths generally use `/assets/...`, so a static server at repository root is the intended local environment. Each themed page has its own supporting material files. There is no indication of a backend, account system, or gameplay execution in the browser site.

The site's README contains a mirror of the Unity repository's technical documentation. That material describes stages in the Cambrian, Ordovician, and Silurian, idle combat and bosses, Fire/Water/Frost/Earth skills, two-material crafting, equipment, a Book of Era, and a timed true/false quiz. It should be understood as context for the *game being showcased*, not as features implemented in the website's JavaScript. The Unity checkout is a partial source archive; a Drive link preserves the original full-project location. The README states that the presentation build worked, but current external downloads were not verified.

## Why it matters as portfolio material

The companion site demonstrates the work of packaging and explaining a larger creative/technical project. A player can encounter the story and subject matter before opening the game. It also preserves team and resource links around an archived student project. The repo alone does not reveal the author's exact role in page design, writing, art, or the original game, so those should be elicited rather than assumed.

## Evidence and open questions

- Sources: `project/Era-Odyssey/README.md`, `index.html`, `assets/Home.html`, `assets/Monster.html`, `assets/Information.html`, `assets/Play.html`, `assets/Animation.html`, `assets/Gallery.html`, `assets/About.html`, and `assets/material/` (paths after repository root). Related game source: `project/Unity-EraOdesey/`.
- Ask the owner: Which site pages, art, story, educational content, and game components were personally yours? What did the competition require and what was its result? Are the downloads still intended to be public?

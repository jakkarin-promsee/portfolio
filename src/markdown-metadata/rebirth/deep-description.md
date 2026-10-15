# Rebirth

## Player experience

Rebirth is a playable 2D pixel-art action game with a prison-escape story. Movement, dash, mouse aiming, weapon pickup/drop, and a three-slot inventory make the room-to-room encounters active rather than automatic. The player fights regular enemies, obtains new weapons from treasure rooms, then reaches a separate Spirit King fight. A Mystery Man dialogue choice is stored for the ending. The README links an HTML5 build and gameplay video, but the code in this checkout is the source of the mechanics described here; the external build may differ.

## Weapons and combat

Seven player weapons appear in `ItemManager`: Sword, Pistol, AK, Shotgun, Bow, Magic Orb, and Rocket Launcher. A pickup's `ItemSO` provides identity, while prefab components and `RangeWeaponConfig` or `MeleeWeaponConfig` provide behavior and numeric tuning. `Gun` manages firing interval, projectile spawn, and recoil. Projectile code handles travel, hit detection, owner tags, damage, knockback, effects, and lifetime. Subclasses add shotgun spread, piercing magic, and rocket burn. The sword's active reflection consumes shield when the player presses F. The three-slot inventory can equip or cycle weapons; taking a fourth drops the equipped weapon. This is a combat system with interacting inventory, player stats, and projectile ownership, rather than merely a catalog of weapon sprites.

## Encounter architecture

Five regular-enemy prefabs—sword, pistol, shotgun, AK, and bow—share an action controller and pull different ranges, speeds, durations, cooldowns, and weapons from `EnemyStatusConfig` assets. Their state behavior includes idle/patrol, direct chase, orbiting around an encounter point, short random repositioning, sideways dodge, and attack/recovery. Sight or damage wakes a patrolling enemy. Low health or proximity can trigger evasive movement; randomized timing prevents identical rhythms. Regular enemies use Rigidbody2D velocity and a stuck check, not navigation pathfinding, so walls can still block them.

The room loop is coordinated by `ActiveDoorArea` and `MapManager`. Crossing a room trigger shuts doors and activates enemies. Later waves spawn on random ground-tile cells while excluding obstruction tiles. Once the configured enemies and waves are gone, the door reopens; a treasure-room component can then make weapon rewards available. Damage events update player HUD and boss HP UI. The enabled Unity build scene is `Assets/Scenes/TileMap1.unity`.

The Spirit King differs from ordinary enemies. It uses a 2D-configured `NavMeshAgent` through NavMeshPlus, telegraphed normal attacks, and six scripted skills: directional dash and impact, laser, larger sword area, meteors, sweeping arena laser, and regular-enemy summons. Arrays define three attack phases; code changes phase below 80% and 40% HP. Coroutines coordinate warning graphics, animations, damage windows, and camera shake. Defeating the boss activates the ending panel according to the earlier story choice.

## What the repository proves

This is a complete Unity project with scenes, prefabs, configs, packages, settings, and a published browser-build link. The source identifies Unity 2022.3.51f1 and URP 14.0.11. The README credits “nightst and collaborators,” so personal ownership of particular mechanics should be confirmed before writing a first-person portfolio claim. The scene and prefab setup was not verified in Editor play mode during this summary.

## Evidence and open questions

- Sources: `project/rebirth/README.md`, `Assets/Scripts/Manager/ItemManager.cs`, `Assets/Scripts/Enemy/EnemyActionController.cs`, `Assets/Scripts/Scriptable/EnemyStatusConfig.cs`, `Assets/Scripts/Manager/MapManager.cs`, `Assets/Scripts/Boss/Spirit King.cs`, `Assets/Scripts/Dialog/MysteryMan.cs`, `Assets/Prefabs/`, `Assets/Scenes/`, `Packages/manifest.json`, and `ProjectSettings/ProjectVersion.txt` (paths after repository root).
- Ask the owner: Which game systems, art, and level/story work were personally yours? What inspired the prison narrative and enemy behavior? Was there playtest feedback or a competition outcome?

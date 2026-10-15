# Era Odyssey (Unity Game)

## Game and educational intent

Era Odyssey is a 2D idle combat game about Earth's geological history, developed by a high-school team for a learning technology competition. Its design couples a familiar progression loop—choose a stage, fight, level up, collect items, craft, and grow stronger—with period-specific creatures and an in-game reading and quiz system. The checked-in source covers Cambrian, Ordovician, and Silurian stages. The companion `Era-Odyssey` repository presents the story, creatures, galleries, team, and download links through a static website.

## How a session progresses

`GameController` tracks player level, experience, unlocked stages, and current geological period. It requests stage changes from `IteeSpawner`, which chooses enemy prefabs and handles rounds, regular enemies, mini-bosses, and bosses. `PlayerMainController` calculates player statistics and attacks, including values contributed by equipment and skills. `EnemyMainSystem` handles enemy HP, attacks, elemental effects, experience rewards, and item drops. A defeated enemy can produce materials for the inventory, feeding the next crafting/upgrading cycle.

Item definitions live in `InventoryMaterialData` and `InventoryWeaponData` ScriptableObjects. The inventory tracks quantities and item discovery/use state. Crafting checks two material requirements on an equipment definition, consumes resources, and increments crafted equipment count. The equipment system supports two weapons and four armor pieces—helmet, chest, leggings, and boots. Fire, Water, Frost, and Earth abilities have levels and cooldowns with element-specific effects. These mechanics make geological stage progress both a combat and resource-management activity.

The educational branch is implemented in `1.BookOfEra/`. Players can select and read chapters, then take a timed true/false mini-game. Question assets include Thai and English content. The README presents this as part of the game rather than a separate site; the companion website extends the subject matter outside the Unity executable.

## Persistence and repository state

`DataPersistanceManager` finds participating `IDataPersistance` components, loads `GameData` from JSON via `FileDataHandler` or creates defaults, and distributes state. On application quit it collects state and saves under `Application.persistentDataPath`. The model spans player progress, item inventories, equipment, and skills.

The project ran during its original presentation, according to the README. This repository itself is a partial source/archive of code, prefabs, and selected assets, without `Packages/manifest.json` or `ProjectSettings/`; it is not a directly openable, verified Unity build. The original `readme.txt` links a full project on Google Drive, whose current contents were not checked. Many component relationships and values depend on Inspector bindings in that full project.

The README also records source-level maintenance risks: Silurian selection gates use IDs inconsistent with automatic stage IDs; crafting quantity comparisons can approve insufficient materials; data definitions hold mutable player state; changed item/skill array lengths can reset saves; file writes overwrite the save directly; quiz sampling excludes the first question; and a runtime script imports `UnityEditor`. These are useful context for the project's actual engineering state and should not be confused with a claim that the historical presentation failed.

## Evidence and open questions

- Sources: `project/Unity-EraOdesey/README.md`, `readme.txt`, `1.Combat/New Scripts/GamePlayScript/GameController.cs`, `IteeSpawner.cs`, `PlayerMainController.cs`, `EnemyMainSystem.cs`, `1.Combat/New Scripts/SkillAllSystem.cs`, `1.Inventory/Scripts/Inventory Script/InventoryAllItemSystem.cs`, `1.Inventory/EquipmentSystem.cs`, `1.BookOfEra/MiniGame.cs`, `1.SaveData/DataPersistanceManager.cs`, and `1.SaveData/Data/GameData.cs` (paths after repository root).
- Ask the owner: Which systems and creative assets were personally yours, how was educational effectiveness evaluated, and what competition result or audience feedback can be reported? What is the current status of the full project archive?

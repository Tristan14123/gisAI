# GISAI Assistant

Assistant géomatique local pour QGIS — articulation d'un modèle de langage local, d'un RAG documentaire et d'outils spatiaux déterministes.

[![License: MIT](https://img.shields.io/badge/License-Open%20Source-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Rapport%20de%20synthèse-green.svg)]()
[![QGIS](https://img.shields.io/badge/QGIS-PyQGIS%20%7C%20GDAL%20%7C%20PostGIS-blue.svg)]()
[![Hermes Agent](https://img.shields.io/badge/Hermes%20Agent-Port%208642-purple.svg)]()

---

## 📋 Présentation

**GeoAI Assistant** est un rapport de synthèse et une architecture de référence pour déployer une intelligence artificielle agente locale dans les flux de travail géomatiques. Le projet se compose de :

1. **Un site web de documentation** (blanc épuré, style notice technique / manuel LEGO)
2. **Un manuel de construction en 8 étapes** pour installer l'inférence locale et le runtime Hermes Agent
3. **Une thèse d'architecture** sur l'établissement d'une équipe de géomaticiens autonomes propulsée par l'IA agentique

## 🗺️ Structure du dépôt

```
gisAI/
├── site_geoai/                 # Site web de documentation
│   ├── index.html              # Page d'accueil (propos, catalogue manuel)
│   ├── manuel.html             # Notice de construction en 8 étapes
│   ├── agentic-team.html       # Thèse d'architecture (Géomaticien IA)
│   ├── css/style.css           # Design blanc épuré
│   ├── js/main.js              # Interactions page d'accueil
│   ├── js/manuel.js            # Navigation étape par étape
│   └── images/                 # 8 visuels des étapes du manuel (1.jpg à 8.jpg)
├── rapport_geomatique_ia_v4.docx.pdf  # Manuscrit complet
└── README.md                   # Ce fichier
```

## 🚀 Démarrage rapide

### 1. Consulter le site

Ouvrez directement `site_geoai/index.html` dans votre navigateur. Aucune installation n'est requise pour lire la documentation.

### 2. Suivre le manuel de construction

Le manuel (`site_geoai/manuel.html`) détaille le déploiement en 8 étapes :

| Étape | Contenu | Visuel |
|-------|---------|--------|
| 01 | Prérequis et environnement | `images/1.jpg` |
| 02 | Installation d'Ollama (port 11434) | `images/2.jpg` |
| 03 | Téléchargement du modèle (GGUF Q4_K_M) | `images/3.jpg` |
| 04 | Déploiement de Hermes Agent (port 8642) | `images/4.jpg` |
| 05 | Configuration du serveur API | `images/5.jpg` |
| 06 | Variables d'environnement critiques | `images/6.jpg` |
| 07 | Cloisonnement et plafonnement des sorties | `images/7.jpg` |
| 08 | Vérification et mise en production | `images/8.jpg` |

Naviguez avec les flèches ← → du clavier ou les boutons de la notice.

### 3. Télécharger le manuscrit

Le rapport complet est disponible au format PDF :

[📥 Télécharger le manuscrit](https://github.com/Tristan14123/gisAI/blob/main/rapport_geomatique_ia_v4.docx.pdf)

## 🏗️ Architecture technique

L'architecture repose sur **trois piliers indissociables** :

1. **Moteur d'agent persistant (Runtime)** — Hermes Agent sur port 8642, haute disponibilité, asynchronisme, persistance contextuelle.
2. **Outillage métier géospatial (GeoAI)** — PyQGIS, GDAL, PostGIS, Deep Learning, statistiques spatiales.
3. **Gouvernance déterministe** — Moindre privilège, garde-fous au runtime, Human-in-the-loop, journalisation immuable.

### Endpoints API Hermes Agent

| Endpoint | Type | Usage |
|----------|------|-------|
| `POST /v1/chat/completions` | Stateless | Format OpenAI Chat Completions, flux SSE keepalive |
| `POST /v1/responses` | Stateful | Gestion d'état via `previous_response_id` |
| `POST /v1/runs` | Asynchrone | Requêtes longues, retourne un `run_id` |

## 🛡️ Licence

Ce projet est distribué sous licence **Open Source**. Vous êtes libres de l'utiliser, de le modifier et de le distribuer selon les termes de la licence associée.

## 👤 Auteur

**Tristan VACHAUDEZ** — Rapport de synthèse, Géomatique & IA agentique  
[🔗 GitHub](https://github.com/Tristan14123)

---

*Technologies : QGIS · PyQGIS · GDAL · PostGIS · Ollama · Hermes Agent*  
*© 2026 Tristan VACHAUDEZ — Rapport de synthèse — Licence open source*

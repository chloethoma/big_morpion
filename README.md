# Big Morpion
Jeu Big Morpion
JavaScript / HTML / CSS

## Description
Version améliorée du jeu du morpion avec 9 cases contenant chacunes une mini grille de 3x3 (soit 81 cases). 

Les règles sont celles du morpion complétée. Les joueurs remplissent tour à tour les cases avec le symbole qui leur est attribué.
Lorsqu'un joueur a réussi à aligner 3 symboles dans une mini-grille il remporte cette mini grille.
Le premier joueur qui a gagné trois mini-grilles alignées (horizontalement, verticalement ou en diagonale) remporte la partie.

Ces règles sont complétées par les trois règles suivantes:
- Si un joueur joue dans une case, le joueur suivant joue dans la mini-grille qui occupe la même place dans la grille que le coup joué. Ainsi dans l'exemple ci-dessous, si X joue dans la grille 4 comme indiquée, O devra jouer dans la grille 6.
- Si un joueur envoie son adversaire dans une minigrille déjà gagnée, l'adversaire pourra jouer dans n'importe quelle case vide de la grille de jeu.

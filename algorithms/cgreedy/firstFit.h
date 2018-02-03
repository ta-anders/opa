//
// Created by Thomas Anderson on 3/2/18.
//
#include "common.h"

#ifndef CGREEDY_FIRSTFIT_H
#define CGREEDY_FIRSTFIT_H

typedef struct Node {
    int xCoordinate;
    int yCoordinate;
    int height;
    int width;
    struct Node* leftChild;
    struct Node* rightChild;
} Node;

Node *insert(Node *node, PackingObject *packingObject);

PackingObject *doFirstFitPack(PackingSpace *packingSpace,
                              PackingObject packingObjects[],
                              size_t numObjects);

#endif //CGREEDY_FIRSTFIT_H

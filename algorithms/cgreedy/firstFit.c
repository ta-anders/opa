#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#include "firstFit.h"


Node *insert(Node *node, PackingObject *packingObject) {
    // Check if this node is a leaf or not
    if (node->leftChild || node->rightChild) {
        if (node->leftChild) {
            Node *newlNode = insert(node->leftChild, packingObject);
            if (newlNode) {
                return newlNode;
            }
        }

        if (node->rightChild) {
            Node *newrNode = insert(node->rightChild, packingObject);
            if (newrNode) {
                return newrNode;
            }
        }

        // Can't fit it anywhere
        return NULL;
    }

    int axisWidth = node->width - packingObject->width;
    int axisHeight = node->height - packingObject->height;

    // Check if it can actually fit
    if (axisWidth < 0 || axisHeight < 0) {
        return NULL;
    }
    else {
        Node *newLeft = malloc(sizeof(Node));
        Node *newRight = malloc(sizeof(Node));

        newLeft->leftChild = NULL;
        newLeft->rightChild = NULL;
        newRight->leftChild = NULL;
        newRight->rightChild = NULL;

        node->leftChild = newLeft;
        node->rightChild = newRight;

        if (axisWidth <= axisHeight) {
            node->leftChild->xCoordinate = node->xCoordinate + packingObject->width;
            node->leftChild->yCoordinate = node->yCoordinate;
            node->leftChild->width = axisWidth;
            node->leftChild->height = packingObject->height;

            node->rightChild->xCoordinate = node->xCoordinate;
            node->rightChild->yCoordinate = node->yCoordinate + packingObject->height;
            node->rightChild->width = node->width;
            node->rightChild->height = axisHeight;
        }
        else {
            node->leftChild->xCoordinate = node->xCoordinate;
            node->leftChild->yCoordinate = node->yCoordinate + packingObject->height;
            node->leftChild->width = packingObject->width;
            node->leftChild->height = axisHeight;

            node->rightChild->xCoordinate = node->xCoordinate + packingObject->width;
            node->rightChild->yCoordinate = node->yCoordinate;
            node->rightChild->width = axisWidth;
            node->rightChild->height = node->height;
        }

        node->height = packingObject->height;
        node->width = packingObject->width;

        return node;
    }
}


PackingObject *doFirstFitPack(PackingSpace *packingSpace,
                              PackingObject packingObjects[],
                              size_t numObjects)
{

    clock_t begin = clock();

    Node rootNode;
    rootNode.xCoordinate = 0;
    rootNode.yCoordinate = 0;
    rootNode.width = packingSpace->totalWidth;
    rootNode.height = packingSpace->totalHeight;

    rootNode.leftChild = NULL;
    rootNode.rightChild = NULL;

    printf("Packing space has dimensions (h:%d, w:%d)\n",
           packingSpace->totalHeight,
           packingSpace->totalWidth);

    qsort(packingObjects, numObjects, sizeof(*packingObjects), pobjSort);

    for (int i = 0; i < numObjects; i++) {
        Node * thisAns = insert(&rootNode, &packingObjects[i]);

        if (thisAns) {
            placeObject(&packingObjects[i],
                        thisAns->xCoordinate,
                        thisAns->yCoordinate);
        }
    }

    clock_t end = clock();
    double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;

    printf("First fit algorithm ran in %f seconds\n", time_spent);

    return packingObjects;
}
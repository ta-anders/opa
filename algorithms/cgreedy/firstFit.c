#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#include "firstFit.h"
#include "common.h"


/*
 * Function responsible for finding a place to put a packing object within a given rectangle.
 *
 * Once the object is placed, the parent node is split into two children which can then be utilised
 * by later objects to be packed.
 */
Node *insert(Node *node, PackingObject *packingObject, int allowRotation) {
    // Check if this node is a leaf or not
    if (node->leftChild || node->rightChild) {
        if (node->leftChild) {
            Node *newlNode = insert(node->leftChild, packingObject, allowRotation);
            if (newlNode) {
                return newlNode;
            }
        }

        if (node->rightChild) {
            Node *newrNode = insert(node->rightChild, packingObject, allowRotation);
            if (newrNode) {
                return newrNode;
            }
        }

        // Can't fit it anywhere
        return NULL;
    }

    // Check if it can actually fit
    if (node->width - packingObject->width < 0 ||
        node->height - packingObject->height < 0)
    {
        if (!allowRotation) {
            return NULL;
        }

        if (node->width - packingObject->height < 0 ||
            node->height - packingObject->width < 0)
        {
            return NULL;
        }
        else {
            // We can fit it in by rotating - switch around the data.
            const int origWidth = packingObject->width;
            packingObject->width = packingObject->height;
            packingObject->height = origWidth;
            packingObject->rotated = 1 - packingObject->rotated;
            printf("%d was rotated\n", packingObject->id);
        }
    }

    int axisWidth = node->width - packingObject->width;
    int axisHeight = node->height - packingObject->height;

    Node *newLeft = malloc(sizeof(Node));
    Node *newRight = malloc(sizeof(Node));

    initNodeChildren(newLeft);
    initNodeChildren(newRight);

    node->leftChild = newLeft;
    node->rightChild = newRight;

    if (axisWidth <= axisHeight) {
        setNodeData(node->leftChild,
                    node->xCoordinate + packingObject->width,
                    node->yCoordinate,
                    axisWidth,
                    packingObject->height);

        setNodeData(node->rightChild,
                    node->xCoordinate,
                    node->yCoordinate + packingObject->height,
                    node->width,
                    axisHeight);
    }
    else {
        setNodeData(node->leftChild,
                    node->xCoordinate,
                    node->yCoordinate + packingObject->height,
                    packingObject->width,
                    axisHeight);

        setNodeData(node->rightChild,
                    node->xCoordinate + packingObject->width,
                    node->yCoordinate,
                    axisWidth,
                    node->height);
    }

    return node;
}

/*
 * Traverses through the binary tree and releases all malloc'd pointers.
 */
void freeMemory(Node *root) {
    if (root->rightChild) {
        freeMemory(root->rightChild);
    }
    if (root->leftChild) {
        freeMemory(root->leftChild);
    }
    free(root);
}


/*
 * Initialises the children of a node to point at nothing.
 */
void initNodeChildren(Node *node) {
    node->leftChild = NULL;
    node->rightChild = NULL;
}


/*
 * Sets a bunch of data on a blank node pointer.
 */
Node *setNodeData(Node *node,
                  int xCoordinate,
                  int yCoordinate,
                  int width,
                  int height)
{
    node->xCoordinate = xCoordinate;
    node->yCoordinate = yCoordinate;
    node->width = width;
    node->height = height;

    return node;
}


PackingObject *doFirstFitPack(PackingSpace *packingSpace,
                              PackingObject packingObjects[],
                              PackingParameters *packingParameters,
                              size_t numObjects)
{

    clock_t begin = clock();

    Node *rootNode = malloc(sizeof(Node));
    rootNode->xCoordinate = 0;
    rootNode->yCoordinate = 0;
    rootNode->width = packingSpace->totalWidth;
    rootNode->height = packingSpace->totalHeight;

    initNodeChildren(rootNode);

    printf("Packing space has dimensions (h:%d, w:%d)\n",
           packingSpace->totalHeight,
           packingSpace->totalWidth);

    // Sort the objects in order of decreasing volume
    qsort(packingObjects, numObjects, sizeof(*packingObjects), pobjSort);

    for (int i = 0; i < numObjects; i++) {
        Node * thisAns = insert(rootNode, &packingObjects[i], packingParameters->allowRotation);

        if (thisAns) {
            placeObject(&packingObjects[i],
                        thisAns->xCoordinate,
                        thisAns->yCoordinate);
        }
    }

    freeMemory(rootNode);

    clock_t end = clock();
    double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;

    printf("First fit algorithm ran in %f seconds\n", time_spent);

    return packingObjects;
}
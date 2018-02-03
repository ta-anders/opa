#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#include "firstFit.h"

/*
 * Function responsible for finding a place to put a packing object within a given rectangle.
 *
 * Once the object is placed, the parent node is split into two children which can then be utilised
 * by later objects to be packed.
 */
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

        node->height = packingObject->height;
        node->width = packingObject->width;

        return node;
    }
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
        Node * thisAns = insert(rootNode, &packingObjects[i]);

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
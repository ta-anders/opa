#ifndef CGREEDY_PACK_H
#define CGREEDY_PACK_H


typedef struct {
    unsigned int id;
    int height;
    int width;
    int xCoordinate;
    int yCoordinate;
} PackingObject;


typedef struct {
    int totalHeight;
    int totalWidth;
} PackingSpace;


PackingObject *doPack(PackingSpace *packingSpace, PackingObject packingObjects[], size_t numObjects);


#endif //CGREEDY_PACK_H

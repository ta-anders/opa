#ifndef CREEDY_PACK_H
#define CREEDY_PACK_H


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


#endif //CREEDY_PACK_H

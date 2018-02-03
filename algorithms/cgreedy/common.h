#ifndef CGREEDY_UTILS_H
#define CGREEDY_UTILS_H

typedef struct {
    unsigned int id;
    int height;
    int width;
    int xCoordinate;
    int yCoordinate;
    int rotated;
} PackingObject;

typedef struct {
    int totalHeight;
    int totalWidth;
} PackingSpace;

int getVolume (PackingObject *pobj);

int pobjSort(const void *elem1, const void *elem2);

PackingObject * placeObject(PackingObject *packingObject,
                            int xCoordinate,
                            int yCoordinate);

#endif //CGREEDY_UTILS_H

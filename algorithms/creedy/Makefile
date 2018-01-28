CC=gcc
CFLAGS=-I.
DEPS = pack.h
OBJ = main.o pack.o

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

creedy: $(OBJ)
	gcc -o creedy.so $^ $(CFLAGS)

.PHONY : clean

clean :
	rm -f creedy *.o *.d
	rm -f creedy.so

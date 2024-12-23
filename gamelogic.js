import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class SlidePuzzle {
    private static final int SIZE = 4;
    private int[][] board;
    private int emptyRow;
    private int emptyCol;

public SlidePuzzle() {
        board = new int[SIZE][SIZE];
        initializeBoard();
        shuffleBoard();
    }
private void initializeBoard() {
        int num = 1;
        for (int row = 0; row < SIZE; row++) {
            for (int col = 0; col < SIZE; col++) {
                board[row][col] = num;
                num++;
            }
        }
        board[SIZE - 1][SIZE - 1] = 0; // Empty space
        emptyRow = SIZE - 1;
        emptyCol = SIZE - 1;
    }
private void shuffleBoard() {
        List<Integer> numbers = Arrays.asList(
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0
        );
        Collections.shuffle(numbers);

        int index = 0;
        for (int row = 0; row < SIZE; row++) {
            for (int col = 0; col < SIZE; col++) {
                board[row][col] = numbers.get(index);
                if (board[row][col] == 0) {
                    emptyRow = row;
                    emptyCol = col;
                }
                index++;
            }
        }
    }
public void displayBoard() {
        for (int row = 0; row < SIZE; row++) {
            for (int col = 0; col < SIZE; col++) {
                if (board[row][col] == 0) {
                    System.out.print("   ");
                } else {
                    System.out.printf("%2d ", board[row][col]);
                }
            }
            System.out.println();
        }
    }
public boolean move(int value) {
        int row = -1;
        int col = -1;
        for (int r = 0; r < SIZE; r++) {
            for (int c = 0; c < SIZE; c++) {
                if (board[r][c] == value) {
                    row = r;
                    col = c;
                }
            }
        }
        if (row == -1 || col == -1) {
            return false;
        }
        if (Math.abs(emptyRow - row) + Math.abs(emptyCol - col) == 1) {
            board[emptyRow][emptyCol] = value;
            board[row][col] = 0;
            emptyRow = row;
            emptyCol = col;
            return true;
        }
        return false;
    }
public boolean isSolved() {
        int num = 1;
        for (int row = 0; row < SIZE; row++) {
            for (int col = 0; col < SIZE; col++) {
                if (row == SIZE - 1 && col == SIZE - 1) {
                    return board[row][col] == 0;
                }
                if (board[row][col] != num) {
                    return false;
                }
                num++;
            }
        }
        return true;
    }
public static void main(String[] args) {
        SlidePuzzle puzzle = new SlidePuzzle();
        puzzle.displayBoard();

        // Example of moving tiles
        puzzle.move(15);
        puzzle.displayBoard();

        // Check if the puzzle is solved
        System.out.println("Puzzle solved: " + puzzle.isSolved());
    }
}

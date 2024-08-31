import java.util.*;
import java.io.*;

public class Graph {
  private final Queue<File> queue = new ArrayDeque<>();;
  private final Map<File, Color> coloredGraph = new HashMap<>();
  public final Map<File, ArrayList<File>> graph = new HashMap<>();
  public final Stack<File> cycle = new Stack<>();

  private static enum Color {
    BLACK, GRAY, WHITE
  }

  private boolean dfs(File vertex) {
    Color currentColor = coloredGraph.get(vertex);
    cycle.add(vertex);

    switch (currentColor) {
      case BLACK:
        cycle.pop();
        return true;
      case GRAY:
        return false;
      case WHITE:
        coloredGraph.put(vertex, Color.GRAY);

        ArrayList<File> neighbours = graph.get(vertex);
        for (File neighbour : neighbours) {
          if (!dfs(neighbour)) {
            return false;
          }
        }
    }
    coloredGraph.put(vertex, Color.BLACK);
    queue.add(vertex);
    cycle.pop();
    return true;
  }

  private boolean hasCycle() {
    ArrayList<File> keys = new ArrayList<>(graph.keySet());
    keys.sort(Comparator.comparing(File::getName));

    for (File key : keys) {
      if (!dfs(key)) {
        return true;
      }
    }
    return false;
  }

  public void addVertex(File key, ArrayList<File> values) {
    graph.putIfAbsent(key, values);
    coloredGraph.putIfAbsent(key, Color.WHITE);
  }

  public ArrayList<File> getSortedGraph() {
    if (hasCycle()) {
      StringBuilder cycleOutput = new StringBuilder("Cycle detected:\n");

      for (File file : cycle) {
        cycleOutput.append(file.getPath()).append("\n");
      }

      throw new RuntimeException(cycleOutput.toString());
    }

    ArrayList<File> sortedGraph = new ArrayList<>();
    while (!queue.isEmpty()) {
      sortedGraph.add(queue.remove());
    }

    return sortedGraph;
  }
}

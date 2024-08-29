import java.io.*;
import java.util.*;
import java.nio.file.*;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

class Main {
  private static final Path ROOT_PATH = Paths.get("").toAbsolutePath();
  private static final Pattern PATTERN_REQUIRE = Pattern.compile("require '([^']+)'");;
  private static final Graph graph = new Graph();;
  private static final FileManager FileManager = new FileManager(ROOT_PATH);

  private final static void searchDependencies(String line, ArrayList<File> dependencies) {
    Matcher matcher = PATTERN_REQUIRE.matcher(line);

    while (matcher.find()) {
      String foundPath = matcher.group(1);
      Path relativeFilePath = Paths.get(foundPath);
      Path absoluteFilePath = ROOT_PATH.resolve(relativeFilePath);
      File txtFile = new File(absoluteFilePath + ".txt");

      dependencies.add(txtFile);
    }
  }

  private final static void addFileToGraph(File file) {
    ArrayList<File> dependencies = new ArrayList<>();

    try (BufferedReader reader = new BufferedReader(new FileReader(file.getAbsolutePath()))) {
      String line;
      while ((line = reader.readLine()) != null) {
        searchDependencies(line, dependencies);
      }
    } catch (IOException e) {
      System.out.println(e.getMessage());
    }

    graph.addVertex(file, dependencies);
  }

  public static void main(String[] args) {
    FileManager.searchFiles(ROOT_PATH);
    ArrayList<File> files = FileManager.getFiles();

    for (File file : files) {
      addFileToGraph(file);
    }

    try {
      ArrayList<File> sortedFiles = graph.getSortedGraph();
      File resultFile = FileManager.createFile("result");
      FileManager.concatFiles(resultFile, sortedFiles);

      System.out.println("Check the result.txt in the root folder");
    } catch (RuntimeException e) {
      System.out.println(e.getMessage());
    }
  }
}
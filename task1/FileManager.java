import java.io.*;
import java.nio.file.*;
import java.util.*;

public class FileManager {
	private final Path ROOT_PATH;
	private final ArrayList<File> textFilesList = new ArrayList<File>();

	public FileManager(Path rooPath) {
		this.ROOT_PATH = rooPath;
	}

	private Path getAbsolutePath(String filePath) {
		return this.ROOT_PATH.resolve(filePath);
	}

	public ArrayList<File> getFiles() {
		return this.textFilesList;
	}

	public void searchFiles(Path dirPath) {
		File[] files = dirPath.toFile().listFiles();

		if (files == null) {
			return;
		}

		for (File file : files) {
			if (file.isDirectory()) {
				Path path = getAbsolutePath(file.getPath());
				searchFiles(path);
			}

			if (file.isFile() && file.getName().endsWith(".txt")) {
				this.textFilesList.add(file);
			}
		}
	}

	public File createFile(String name) {
		File file = new File("./" + name + ".txt");

		if (file.exists()) {
			file.delete();
		}

		try {
			file.createNewFile();
		} catch (IOException e) {
			System.out.println("Error during file creation: " + e.getMessage());
		}

		return file;
	}

	public void concatFiles(File resultFile, ArrayList<File> files) {
		try (BufferedWriter writer = new BufferedWriter(new FileWriter(resultFile))) {
			for (File file : files) {
				try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
					String line;

					while ((line = reader.readLine()) != null) {
						writer.append(line);
						writer.append(System.lineSeparator());
					}
				} catch (IOException e) {
					System.out.println(e.getMessage());
				}
				writer.newLine();
			}
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
	}
}

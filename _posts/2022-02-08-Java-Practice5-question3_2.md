---
title: 'Java - Practice5 - question3_2'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 문제 3_2

첨부된 txt파일은 유명한 노래 가사이다. 해당 노래를 3개의 txt파일로 나누려고 한다.

> sample.txt

```
Is this the real life?
Is this just fantasy?
Caught in a landslide
No escape from reality
Open your eyes
Look up to the skies and see
I'm just a poor boy, I need no sympathy
Because I'm easy come, easy go
A little high, little low
Anyway the wind blows, doesn't really matter to me, to me
Mama, just killed a man
Put a gun against his head
Pulled my trigger, now he's dead
Mama, life had just begun
But now I've gone and thrown it all away
Mama, oh oh
Didn't mean to make you cry
If I'm not back again this time tomorrow
Carry on, carry on, as if nothing really matters
Too late, my time has come
Sends shivers down my spine
Body's aching all the time
Goodbye everybody I've got to go
Gotta leave you all behind and face the truth
Mama, oh oh (anyway the wind blows)
I don't want to die
Sometimes wish I'd never been born at all
I see a little silhouetto of a man
Scaramouch, Scaramouch will you do the Fandango
Thunderbolt and lightning very very frightening me
Gallileo, Gallileo, Gallileo, Gallileo, Gallileo, figaro, magnifico
I'm just a poor boy and nobody loves me
He's just a poor boy from a poor family
Spare him his life from this monstrosity
Easy come easy go will you let me go
Bismillah, no we will not let you go, let him go
Bismillah, we will not let you go, let him go
Bismillah, we will not let you go, let me go
(Will not let you go) let me go (never, never let you go) let me go (never let me go)
Oh oh no, no, no, no, no, no, no
Oh mama mia, mama mia, mama mia let me go
Beelzebub has a devil put aside for me for me for me
So you think you can stop me and spit in my eye
So you think you can love me and leave me to die
Oh baby can't do this to me baby
Just gotta get out just gotta get right outta here
Oh oh oh yeah, oh oh yeah
Nothing really matters
Anyone can see
Nothing really matters
Nothing really matters to me
Anyway the wind blows
```

  <br>

> **Answer**

```java
package practice5;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class question3_2 {
	public static void main(String args[]) throws IOException {
		File sample = new File("C:\\Users\\SeungHyun Lee\\eclipse-workspace\\Practice5\\sample.txt");
		File file1 = new File("C:\\Users\\SeungHyun Lee\\eclipse-workspace\\Practice5\\test3_1_1.txt");
		File file2 = new File("C:\\Users\\SeungHyun Lee\\eclipse-workspace\\Practice5\\test3_1_2.txt");
		File file3 = new File("C:\\Users\\SeungHyun Lee\\eclipse-workspace\\Practice5\\test3_1_3.txt");

		FileReader fr = new FileReader(sample);
		BufferedReader br = new BufferedReader(fr);
		FileWriter fw = new FileWriter(file1);
		BufferedWriter bw = new BufferedWriter(fw);

		String flagString = "I see a little silhouetto of a man";
		String tempStr = br.readLine();

		while (tempStr != null) {
			if (tempStr.equals(flagString))
				break;
			bw.write(tempStr);
			bw.newLine();
			tempStr = br.readLine();
		}

		fr.close();
		br.close();
		bw.close();

		FileReader fr2 = new FileReader(sample);
		BufferedReader br2 = new BufferedReader(fr2);
		FileWriter fw2 = new FileWriter(file2);
		BufferedWriter bw2 = new BufferedWriter(fw2);

		String flagString2 = "Oh oh oh yeah, oh oh yeah";
		String tempStr2 = br2.readLine();

		while (tempStr2 != null) {
			if (tempStr2.equals(flagString)) {
				while (tempStr2.equals(flagString2) == false) {
					bw2.write(tempStr2);
					bw2.newLine();
					tempStr2 = br2.readLine();
				}
				break;
			}
			tempStr2 = br2.readLine();
		}

		fr2.close();
		br2.close();
		bw2.close();

		FileReader fr3 = new FileReader(sample);
		BufferedReader br3 = new BufferedReader(fr3);
		FileWriter fw3 = new FileWriter(file3);
		BufferedWriter bw3 = new BufferedWriter(fw3);

		String tempStr3 = br3.readLine();

		while (tempStr3 != null) {
			if (tempStr3.equals(flagString2)) {
				while (tempStr3 != null) {
					bw3.write(tempStr3);
					bw3.newLine();
					tempStr3 = br3.readLine();
				}
				break;
			}
			tempStr3 = br3.readLine();
		}

		fr3.close();
		br3.close();
		bw3.close();
	}
}

```

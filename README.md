# Source Code der Website der Jugendinitiative Mangfalltal
Gebaut mit Jekyll.
Da dieses Repository ist ursprünglich eine fork von https://github.com/mmistakes/minimal-mistakes war, kann den dortigen Docs viel Info über die Funktionen entnommen werden,
vor Allem über Layouts und Komponenten wie Feature-rows.

## Verwendung von pages CMS

Jeder, der an der Website bauen will, braucht einen Github account.
Der Webmaster, der sich hoffentlich bissl besser auskennt, schickt euch dann einen invite link per Email.
Dann könnt ihr euch auf https://pagescms.org/ einloggen.  
**Das erste das ihr dann tut** ist in der linken oberen Ecke den branch auf **dev** zu wechseln, wenn das nicht schon so eingestellt ist.  
Aaand you are good to go. Sollte recht einfach zu bedienen sein.
Jede änderung schön speichern, es dauert ca. 20 Sekunden bis die Website die Änderungen übernimmt. Styles verändern ist ein bisschen technischer, aber das schafft ihr auch.
**Paar wichtige Sachen**:
- Das Favicon (im Browser Tab) muss favicon.ico heißen (gibt schöne Online tools, die dir .ico Dateien aus bildern basteln) und sich im root directory von **Media** befinden
- Wenn ihr [Feature Rows](https://mmistakes.github.io/minimal-mistakes/splash-page/) verwenden wollt, muss in den Textinhalt folgender command an die Stelle, wo die Feature Row erscheinen soll:  
 ``` {% include feature_row %} ```
- Der Kalender ist ein normaler Google Kalender und kann nicht hier verändert werden. 
- Die Ordner im [Archiv](https://jim-archiv.de/) liegen auf dem Webserver könnt ihr auch nicht hier anpassen. Wenn ihr das machen wollt, braucht ihr ein Programm wie FileZilla und einen FTP Zugang, den euch der Webmaster gibt. Das Archiv übernimmt automatisch jede Änderung am File System.


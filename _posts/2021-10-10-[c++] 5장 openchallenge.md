명품 c++ programming open challenge 

```
#include <iostream>
#include <string>
using namespace std;

class Morse {
	string alphabet[26];
	string digit[10];
	string slash, question, comma, period, plus, equal;
public:
	Morse();
	void text2Morse(string text, string& morse);
	bool morse2Text(string morse, string& text);
};

Morse::Morse() {
	string alphamorse[26] = { ".-", "-...", "-.-.", "-..", ".",
							 "..-.", "--.", "....", "..", ".---",
							 "-.-", ".-..", "--", "-.", "---",
							 ".--.", "--.-", ".-.", "...", "-",
							 "..-", "...-", ".--", "-..-", "-.--", "--.." };
	string digitmorse[10] = { "-----", ".----", "..---", "...--", "....-",
							".....", "-....", "--...", "---..", "----." };
	int i;

	for (i = 0; i < 26; i++)
		alphabet[i] = alphamorse[i];
	for (i = 0; i < 10; i++)
		digit[i] = digitmorse[i];
	slash = "-..-.";	question = "..--..";	comma = "--..--";
	period = ".-.-.-";	plus = ".-.-.";		equal = "-...-";
}
void Morse::text2Morse(string text, string& morse) {

	morse = "";

	for (int i = 0; i < text.length(); i++)
	{
		char temp = text.at(i);
		if (isalpha(temp)) {
			if (temp >= 65 && temp <= 90) tolower(temp);
			morse = morse + alphabet[temp - 97] + " ";
		}
		else if (temp == ' ')
			morse += "  ";
		else if (isdigit(temp))
			morse = morse + digit[temp - 48] + " ";
		else {
			if (temp == '/') morse = morse + slash + " ";
			else if (temp == '?') morse = morse + question + " ";
			else if (temp == ',') morse = morse + comma + " ";
			else if (temp == '.') morse = morse + period + " ";
			else if (temp == '+') morse = morse + plus + " ";
			else if (temp == '=') morse = morse + equal + " ";
		}
	}
}
bool Morse::morse2Text(string morse, string& text) {
	int before;
	int pos = -1;
	string retext;
	bool exit = true;

	string al[26] = { "a", "b", "c", "d", "e", "f", "g", "h", "i",
					"j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
					"t", "u", "v", "w", "x", "y", "z" };
	string di[10] = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };

	while (1) {

		before = pos + 1;
		pos = morse.find(" ", before);

		string temp = morse.substr(before, pos - before);
		for (int i = 0; i < 26; i++) {
			if (temp == alphabet[i]) {
				retext.append(al[i]);
				exit = false;
				break;
			}
		}
		if (exit) {
			for (int i = 0; i < 10; i++) {
				if (temp == digit[i]) {
					retext.append(di[i]);
					break;
				}
			}

			if (temp == slash) retext.append("/");
			else if (temp == question) retext.append("?");
			else if (temp == comma) retext.append(",");
			else if (temp == period) retext.append(".");
			else if (temp == plus) retext.append("+");
			else if (temp == equal) retext.append("=");
		}

		exit = true;

		if (pos == morse.size() - 1) break;   //while문 종료

		while (morse.at(pos) == ' ' && morse.at(pos + 1) == ' ' && morse.at(pos + 2) == ' ') {
			retext.append(" ");
			pos += 2;
		}

	}

	if (retext == text) return true;
	else return false;
}

int main() {

	string text, morse;
	Morse m;

	cout << "아래에 영문 텍스트를 입력하세요. 모스 부호로 바꿉니다." << endl;
	getline(cin, text);
	m.text2Morse(text, morse);
	cout << morse << endl << endl;

	cout << "모스 부호를 다시 영문 텍스트로 바꿉니다." << endl;

	if (m.morse2Text(morse, text))
		cout << text << endl;
	else
		cout << "모스 부호가 아닙니다." << endl;

}
```


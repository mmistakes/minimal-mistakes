---
layout: single
title: "Windows Forms - database"
categories: WinForm
tags: [Csharp, WinForm, MsSQL]
---

### 1. ADO.net (ActiveX data objects)

- .NET 프레임워크에서 데이터 액세스를 위한 데이터 접근 기술
- 다양한 데이터 소스(예: SQL Server, Oracle, MySQL, XML 파일 등)와 통신 가능
- 분류
  - 연결형 : 실시간으로 연결된 형태
  - 비연결형(메모리형 DB) : 데이터를 읽거나 쓸때만 연결된 형태
- 구성 요소
  - DataProvider : 데이터 소스와 통신하는 객체 (Connection, Command, DataReader, DataAdapter)
  - DataSet : 데이터 소스의 데이터를 저장하는 객체 (DataTableCollection, DataRelationCollection)
- 기본 클래스
  - System.Data : namespace
  - System.Data.SqlClient : DataProvider
  - System.Data.SqlTypes : Sql Server 데이터형 클래스

### 2. SqlConnection

- 데이터베이스에 연결하는 정보를 담은 객체 (정보만 셋팅, 실제 연결하지는 않음)
- integrated security
  - 사용자 ID와 암호 : integrated security = false
  - 윈도우즈 인증 : integrated security = true
  - 생략시 기본값은 false

```csharp
SqlConnection conn = null;

private void Form1_Load(object sender, EventArgs e)
{
    textBox1.Text = "no setting";
}

private void button1_Click(object sender, EventArgs e)
{
    // connection string은 대소문자 구분 안 함
    string str = "Server=" + "localhost" + ";"
        + "Database=" + textBox2.Text + ";"
        + "User Id=" + textBox3.Text + ";"
        + "Password=" + textBox4.Text + ";";

    conn?.Dispose();
    conn = new SqlConnection(str); // 정보만 셋팅
    textBox1.Text = (conn == null) ? "no setting" : "setting";
}

private void button2_Click(object sender, EventArgs e)
{
    conn.Open(); // 실제로 연결

    if (conn.State == ConnectionState.Open)
        MessageBox.Show("DB Open succ");
    else
        MessageBox.Show("DB Open fail");
}

private void button3_Click(object sender, EventArgs e)
{
    conn.Close(); // Open이 안되어 있더라도 에러 안 남, Dispose 호출 시 자동 호출

    if (conn.State == ConnectionState.Closed)
        MessageBox.Show("DB Close succ");
    else
        MessageBox.Show("DB Close fail");
}

private void button4_Click(object sender, EventArgs e)
{
    conn.Dispose();
    conn = null;
    textBox1.Text = "해제";
    MessageBox.Show("Connection Dispose");
}
```

### 3. 연결형 데이터 접근

- SqlCommand
  - SQL 명령을 실행
  - 주요 속성
    - CommandText : SQL 명령
    - Connection : 연결 객체
    - CommandType : CommandType.Text(SQL), CommandType.TableDirect(테이블 명령), CommandType.StoredProcedure
  - 주요 메서드
    - ExecuteNonQuery() : 영향받은 레코드 수 반환
    - ExecuteReader() : SQL을 Connecton에 보내고 결과를 읽기 위한 SqlDataReader 객체 반환
- SqlDataReader
  - SqlDataReader가 반환되었다면 이미 데이터는 로드 되었음, 하지만 효율적 메모리 사용을 위해 일부만 로드 되어 있음
  - 데이터 일부만 로드 되었다면 reader.Read()로 한 레코드씩 읽는 중에 나머지 데이터를 로드 함
  - 주요 속성 : Connection, FieldCount, HasRows, RecordsAffected
  - 주요 메서드 : Close(), Read()

- <a href="https://youtu.be/8PJXHmaHZds" target="_blank">예제</a>

```csharp
//textBox에 nonQuery(리턴값이 없는 쿼리) 입력
private void button1_Click(object sender, EventArgs e)
{
    using (var conn = new SqlConnection())
    {
        try
        {
            listView1.Clear();
            conn.ConnectionString = "Server=localhost;Database=test;User Id=ilyoung;Password=1234;";
            conn.Open();

            using (var cmd = new SqlCommand(textBox1.Text, conn))
            {
                if(textBox1.Text.Length != 0)
                    cmd.ExecuteNonQuery();
                
                cmd.CommandText = "select * from tbl_student";
                using (var reader = cmd.ExecuteReader())
                {
                    // listView의 view 속성을 List로 변경해야 스트링 형식으로 출력 가능
                    while (reader.Read())
                        listView1.Items.Add(string.Format($"{reader["name"]} {reader["age"]} {reader["male"]}"));
                }
            }
        }
        catch (Exception ex)
        {
            listView1.Items.Add("DB 에러: " + ex.Message);
        }
    }
}
```

### 4. 비연결형 데이터 접근 (메모리형 DataBase)

- DataSet : DataTable들의 집합
  - DataTable : DB 테이블 구조와 데이터를 저장하는 객체
  - DataRow : 테이블의 행을 나타내는 객체
  - DataColumn : 테이블의 열을 나타내는 객체

### 5. DataTable

- DB의 테이블과 동일한 구조를 가지고 있는 객체
- DB 쿼리 후의 결과를 DataTable 객체에 저장하여 사용

```csharp
static void Main()
{
    var tbl = new DataTable();

    tbl.Columns.AddRange(new DataColumn[]
    {
        new DataColumn("name", typeof(string)),
        new DataColumn("age", typeof(int)),
        new DataColumn("male", typeof(bool))
    });

    // primary key 설정
    tbl.PrimaryKey = new DataColumn[] { tbl.Columns["name"] };

    // 데이터 입력
    tbl.Rows.Add("철수", 9, true);
    tbl.Rows.Add("수지", 28, false);
    tbl.Rows.Add("미자", 29, false);
    
    // 객체 순회
    foreach (DataRow row in tbl.Rows)
        Console.WriteLine($"이름:{row["name"]} 나이:{row["age"]} 성별:{row["male"]}");

    // 조건 검색
    DataRow[] rows = tbl.Select("age >= 100"); // 조건은 문자열로 작성
    foreach (var row in rows)
        Console.WriteLine($"이름:{row["name"]} 나이:{row["age"]} 성별:{row["male"]}");
}
```

- <a href="https://youtu.be/kQR_Ql3p-zc" target="_blank">DataGridView 예제</a>

```csharp
DataTable tbl;

private void Form1_Load(object sender, EventArgs e)
{
    tbl = new DataTable();

    tbl.Columns.AddRange(new DataColumn[]
    {
        new DataColumn("name", typeof(string)),
        new DataColumn("age", typeof(int)),
        new DataColumn("male", typeof(bool))
    });

    tbl.Rows.Add("철수", 9, true);
    tbl.Rows.Add("수지", 28, false);
    tbl.Rows.Add("미자", 29, false);
    
    //셀을 선택하면 해당 row가 전부 선택됨
    dataGridView1.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
    dataGridView1.MultiSelect = false; //한 행만 선택
    dataGridView1.DataSource = tbl;
}

private void insertBtn_Click(object sender, EventArgs e)
{
    tbl.Rows.Add(textBox1.Text, int.Parse(textBox2.Text), radioButton1.Checked);
}

private void deleteBtn_Click(object sender, EventArgs e)
{
    //1. DataTable의 서브 객체인 DataRow를 이용
    var idx = dataGridView1.SelectedRows[0].Index; // MultiSelect가 false이므로 
    DataRow row = tbl.Rows[idx];
    row.Delete(); // row 속성에만 삭제 표시
    tbl.AcceptChanges(); // 실제로 삭제
    
    // 2. DataGridView의 서브 객체인 DataGridViewRow를 이용
    //foreach (DataGridViewRow row in dataGridView1.SelectedRows) // multi row인 경우
    //    dataGridView1.Rows.Remove(row);
}

private void updateBtn_Click(object sender, EventArgs e)
{
    var idx = dataGridView1.SelectedRows[0].Index; 
    DataRow row = tbl.Rows[idx];
    row["name"] = textBox1.Text;
    row["age"] = int.Parse(textBox2.Text);
    row["male"] = radioButton1.Checked;
}
```

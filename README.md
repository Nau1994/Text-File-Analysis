# TextFileAnalysis
### 1) Design
  ![image](https://github.com/Nau1994/TextFileAnalysis/assets/95983390/a11cb142-fe0b-4635-b67e-0e6387863375)

### 2) Setup
  **Prerequisite**: docker must be install and running.
1) Clone the git repo
2) run docker commond from project directory.
```console
    docker-compose up
```
![image](https://github.com/Nau1994/TextFileAnalysis/assets/95983390/9d05e5e6-88a6-4619-acb4-7bbbc48a5467)

### 3) Application testing

  **Upload file:**
1) Open POSTMAN application
2) create post request
   ```console
    http://localhost:8080/uploadFile
   ```
   2.1) write url from above, select Body, select form-data, write "TextFile" as key, select Type as File, click on button "Select File" and choose text file and hit Send button.
   ![image](https://github.com/Nau1994/TextFileAnalysis/assets/95983390/c1c2d364-87e1-4d0f-b10a-b857814b20ef)
   2.2) you will get fileId keep it handy to initiate analysis
   ![image](https://github.com/Nau1994/TextFileAnalysis/assets/95983390/ab39fbda-c3c8-4072-9827-a8a602b896ab)
   

**Initiate Text File Analysis:**
   ```console
    http://localhost:8080/textAnalysisInit
   ```
   ```console
    {
    "fileId": "140100303838-movies",
    "operations":["countWords","countUniqueWords","findTopKWords"],
    "k":2
    }
   ```
   1) create post request using above like json data format (replace fileId value to what got from previous step) and choose what operation you want in array (if want to use "findTopKWords" then "k" value is required, hit send.
      ![image](https://github.com/Nau1994/TextFileAnalysis/assets/95983390/03ad4e48-70e2-4e6b-afc5-11d1268763dc)
    you will get taskId keep it handy to retrieve analysis result


**Retrieve Text File Analysis:**
   ```console
    http://localhost:8080/textAnalysisRetrieve
   ```
   ```console
    {
    "taskId": "TSKMOV343"
    }
   ```
   1) create post request using above like json data format (replace taskId value to what got from previous step) and hit send.
  ![image](https://github.com/Nau1994/TextFileAnalysis/assets/95983390/8cb3a5e6-af50-4e57-9288-9e5a40ce5bb7)


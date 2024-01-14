# TextFileAnalysis
### 1) Design
 ![image](https://github.com/Nau1994/Text-File-Analysis/assets/95983390/fa3f7d59-8623-42d5-ba2e-68411d08a68c)


### 2) Setup
  **Prerequisite**: docker must be install and running.
1) Clone the git repo
2) run docker commond from project directory.
```console
    docker-compose up
```
![image](https://github.com/Nau1994/Text-File-Analysis/assets/95983390/5c9f1627-ec51-450c-857b-76833e12b39f)


### 3) Application testing

  **Upload file:**
1) Open POSTMAN application
2) create post request
   ```console
    http://localhost:8080/uploadFile
   ```
   2.1) write url from above, select Body, select form-data, write "TextFile" as key, select Type as File, click on button "Select File" and choose text file and hit Send button.
   ![image](https://github.com/Nau1994/Text-File-Analysis/assets/95983390/2af00622-8c72-46c2-8458-40427ca46188)

   2.2) you will get fileId keep it handy to initiate analysis
   ![image](https://github.com/Nau1994/Text-File-Analysis/assets/95983390/f3844376-ed5e-4a72-8232-8d5e15bc4a4b)

   
**Initiate Text File Analysis:**
   ```console
    http://localhost:8080/textAnalysisInit
   ```
   ```console
    {
    "fileId": "140103312626-movies",
    "operations":["countWords","countUniqueWords","findTopKWords"],
    "k":2
    }
   ```
   1) create post request using above like json data format (replace fileId value to what got from previous step) and choose what operation you want in array (if want to use "findTopKWords" then "k" value is required, hit send.
      ![image](https://github.com/Nau1994/Text-File-Analysis/assets/95983390/b3811f4c-5be2-44bf-a5dd-75c35a6c5e6c)
    you will get taskId keep it handy to retrieve analysis result


**Retrieve Text File Analysis:**
   ```console
    http://localhost:8080/textAnalysisRetrieve
   ```
   ```console
    {
    "taskId": "TSKMOV572"
    }
   ```
   1) create post request using above like json data format (replace taskId value to what got from previous step) and hit send.
  ![image](https://github.com/Nau1994/Text-File-Analysis/assets/95983390/0c72c294-4164-4ef2-bc73-35a6ce3e3b8b)


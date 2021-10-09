# ToDoList

Link:
https://ameybairolu.github.io/ToDo/


Organization of the Project-
1. The model.js contains all the data.
3. Every other file except the model.js and controller.js is responsible for event listeners and the manipulating DOM elements
4. The controller.js is the logic that gets data from model.js and sends them to the other files or vice-versa.
5. I have created multiple .js files. Each file is responsible for each feature. This helps understanding the flow and doesn’t overload any .js file with 100s of lines.

For understanding how the flow is, please refer the Youtube video: 

FEATURES COVERED:
1. Adding tasks.
2. When the active tab is "INCOMPLETE", shows all the Incomplete Tasks.
3. When the active tab is "COMPLETED", shows all the Completed tasks.
3. When the active tab is "INCOMPLETE", and when the user single clicks on any of the task, the task is marked completed.
4. Upon clicking on "MOVE TO COMPLETED" button, the marked tasks are moved to completed.
5. When clicked on the cross(X) button, the respective row is selected and a confirmation window is  displayed to know whether the user really wants to delete the row.
6. When clicked on RESET COMPLETED/RESET INCOMPLETE, all the "completed" tasks or all the "incomplete" tasks are delete, respectively.
7. No repeated tasks are allowed to be entered. I have added a check for that.
8. When the user doesnt input anything and still presses ENTER, or clicks on the submit button, an alert is shown, asking the user to enter something.
9. There is a double-click feature which allows to edit any task on which double click is performed. This for obvious reasons, is triggered when in "incomplete" tab.

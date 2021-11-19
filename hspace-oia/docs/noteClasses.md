### Vietnamese version:

[JIRA-Ticket: BDS-1166](https://jira.tpptechnology.com/browse/BDS-1166)

### Description
There are our classes for classifying notes and users. Currently, we have 3 classes.

Class A: For 3 groups user who have group permissions (by resource/feature). The user who has a group permission can see those notes.

For KSHT, PADT, KSUT, HQDT, TLDA note:
![image](https://user-images.githubusercontent.com/70882608/110887388-d1603c00-831c-11eb-959e-b57ab8e85c88.png)

For TDHT and TDUT note:
![image](https://user-images.githubusercontent.com/70882608/110887433-e937c000-831c-11eb-8741-bc85eb8227f2.png)

Class B: The note can only be seen in the draft status. The user has class B (in DB) who see this note.

![image](https://user-images.githubusercontent.com/70882608/110887608-32880f80-831d-11eb-8b05-59de25addd6b.png)
![image](https://user-images.githubusercontent.com/70882608/110887641-3e73d180-831d-11eb-994a-46b0148906e6.png)

Class C: Can see all except the draft status

![image](https://user-images.githubusercontent.com/70882608/110887777-7549e780-831d-11eb-9f71-453a69b3de0b.png)
![image](https://user-images.githubusercontent.com/70882608/110887785-7da22280-831d-11eb-9363-48bdaf660ffe.png)

Example a class: KH.A, KH.B, KH.C,...
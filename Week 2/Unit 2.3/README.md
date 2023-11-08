# Unit 2.3 Connect SAP Build Apps with AWS services 

Welcome to the hands-on exercises for Week 2 Unit 3.
This exercise is part of the openSAP course [Build Resilient Applications on SAP Business Technology Platform with Amazon Web Services](https://open.sap.com/courses/aws1).
The objective of this exercise is to create an API in Amazon API Gateway to store and retrieve documents from an Amazon S3 bucket.

## Prerequisites
You have created an AWS Free Tier account: [AWS Free Tier](https://aws.amazon.com/free/)

## Section 1: Create an Amazon S3 Bucket
The objective of this section is to create an Amazon S3 bucket to store and retrieve documents. 

<details>

1.	Log on to your [AWS Account](https://console.aws.amazon.com/)

2.	Search for S3 on the search bar or access directly via this [link](https://s3.console.aws.amazon.com/s3/home)

    ![Alt text](./images/aws-1.png)

3.	Click on **Create Bucket**

    ![Alt text](./images/aws-2.png)

4.	Enter your bucket name and select a region.
    Your bucket name needs to be unique. 
    Leave the rest of the settings with their default values.
    Note down the bucket name and region.

    ![Alt text](./images/aws-3.png)

5.	Scroll to the end and select Create Bucket
   
    ![Alt text](./images/aws-4.png)

    Your bucket is created, you can see the success message and the bucket in the list.

</details>

## Section 2: Create IAM Role & Policy

This section describes how to create an IAM Role and Policy that will enable our API to access the Amazon S3 Bucket we recently created to store and retrieve documents. 

<details>

1.	Access the IAM Console by searching or clicking on this [link](https://console.aws.amazon.com/iamv2)

    ![Alt text](./images/aws-5.png)

2. Access the IAM Policies list by clicking on the left menu or the number in the middle of the page

    ![Alt text](./images/image.png)

3. Click **Create policy**

    ![Alt text](./images/image-1.png)

4. Select **JSON**

    ![Alt text](./images/image-2.png)


5.	Enter the **JSON Policy** from the snippet below and click **Next**
    Make sure you replace <your_bucket> with the name of the bucket you created in the previous section
   ![Alt text](./images/image-3.png)
    
    ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "s3:PutObject",
                    "s3:GetObject"
                ],
                "Resource": "arn:aws:s3:::<your_bucket>/*"
            }
        ]
    }

    ```
6.	Enter the **Policy name** and click **Create policy**
    
    ![Alt text](./images/image-4.png)

7.	Access the IAM Roles list by clicking on the left menu 

    ![Alt text](./images/image-5.png)

8.	Click **Create role**
    
    ![Alt text](./images/image-6.png)

9.	Select **Custom trust policy**
    
    ![Alt text](./images/image-7.png)

10.	Insert the **custom trust policy** from the code snippet below and click **Next**
    
    ![Alt text](./images/image-8.png)
    
    ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
            "Sid": "",
            "Effect": "Allow",
            "Principal": {
                "Service": "apigateway.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
            }
        ]
    } 
    ```



11.	Select the Policy created previously.

    Search for the policy by the name, select the policy with the checkbox and click **Next**

    ![Alt text](./images/image-9.png)


12.	Provide a **Role name**, scroll down to the end and click **Create role** 

    ![Alt text](./images/image-10.png)

    Your role has now been created and it is ready to be utilized.

    ![Alt text](./images/image-11.png)

13.	Click on your role name to copy the resource name (ARN) to be utilized in the next section

    ![Alt text](./images/image-12.png)
    
    Keep the ARN handy for the next section. 


</details>

## Section 3: Create API in Amazon API Gateway

This section describes the steps required to create your API in Amazon API Gateway to store and retrieve documents from Amazon S3. 


**Note:** Please use the old console until we update the documentation with the new console for Amazon API Gateway.

<details>

1.	Access Amazon API Gateway by searching for the service or this [link](https://console.aws.amazon.com/apigateway/main/apis)

    ![Alt text](./images/aws-19.png)

2.	 Click **Create API** and then select **REST API - Build**.

     ![Alt text](./images/aws-20.png)

3.	Select **New API**, enter your **API name** and leave **Endpoint Type = Regional**.

    ![Alt text](./images/aws-21_1.png)

4.	Create Resource **{folder}**.  
    Ensure you enter **{folder}** for the **Resource Name** and **Resource Path** field.  


    ![Alt text](./images/aws-22.png)
    ![Alt text](./images/image-14.png)

5.	Create resource **{item}** under {folder}. Ensure you enter **{item}** for both the **Resource Name** and **Resource Path** field. 

    ![Alt text](./images/image-15.png)
    ![Alt text](./images/image-16.png)

6.	Create method **PUT** under {item}
    Ensure **{item}** is selected

    ![Alt text](./images/aws-26.png)

7.	Select **PUT** and click on the refresh button next to it to view the form.
    
    ![Alt text](./images/aws-27.png)

8.	Update with the following information. Leave the rest as default/blank.

    ```
    Integration type: AWS Service
    AWS Region: your region
    AWS Service: Simple Storage Service (S3)
    HTTP Method: PUT
    Action Type: Use path override
    Path override: {bucket}/{object}
    Execution Role: resource name for the role created in the previous section.
    ```
    ![Alt text](./images/aws-28.png)

9.	In the next screen select **Integration Request**.
    We need to map the path (bucket/object) to the resources we created (folder/item)
    
    ![Alt text](./images/aws-29.png)
    
10.	Expand URL Path Parameters and select Add path.
    
    ![Alt text](./images/aws-30.png)
    
11.	Enter the following mappings

    ```
    Name: bucket - Mapped from: method.request.path.folder 
    Name: object – Mapped from: method.request.path.item
    ```

    ![Alt text](./images/aws-31.png)

    Make sure you click on the tick after entering the second line:

    ![Alt text](./images/aws-32.png)

12.	Go back by selecting Method Execution at the top and select **Create Method**, to define the **GET** method under **/{item}**.

    ![Alt text](./images/aws-33.png)

13.	Use the same settings from the PUT method, except for the HTTP method (GET in this case)

    ```
        Integration type: AWS Service
        AWS Region: your region
        AWS Service: Simple Storage Service (S3)
        HTTP Method: GET
        Action Type: Use path override
        Path override: {bucket}/{object}
        Execution Role: resource name for the role created in the previous section.
    ```

    ![Alt text](./images/aws-34.png)

14.	Enter the URL Path Parameters (same parameters used for the PUT Method)
    ![Alt text](./images/aws-35.png)

15.	Click on Method Execution to go back
    ![Alt text](./images/aws-36.png)

16. Enable **CORS**

    From the actions menu, select **Enable CORS**

    ![Alt text](./images/cors-image-0.png)


    Ensure both PUT and GET methods are selected. Click on **Enable CORS and replace existing CORS headers**
    ![Alt text](./images/cors-image-1.png)
    ![Alt text](./images/cors-image-2.png)
    ![Alt text](./images/cors-image-3.png)
    
    Please note that when enabling CORS, the Method Response and Integration Responses will be updated and an entry for Access-Control-Allow-Origin added. No action is required but you will notice this as an additional value.

17.	Click on Settings on the left side to configure the Binary Media Types supported.
    ![Alt text](./images/aws-37.png)

18.	Scroll down, click on **Add Binary Media Type** and enter **application/pdf**

    This will configure binary support for PDF files.

     ![Alt text](./images/aws-38.png)
    
    Click on **Save Changes**. 

19.	Enable security by requesting an API Key for the PUT method. Navigate back to the PUT Method by clicking on Resources and choose PUT

    ![Alt text](./images/aws-39.png)

20.	Select Method Request

    ![Alt text](./images/aws-40.png)

21.	Click the pencil next to API Key Required and change from false to true.

    This will require an API Key to be provided to call the API. 

    ![Alt text](./images/aws-41.png)
    Click on Method Execution to go back

22.	Deploy API

    ![Alt text](./images/aws-42.png)

23.	Create a New Stage, enter a Stage name, Stage description and Deployment description and click Deploy

    ![Alt text](./images/aws-43.png)

24.	Leave all settings with their default values and click Save Changes
    
    ![Alt text](./images/aws-44.png)

    You will find the URL for your API at the top of this page, under Invoke URL. Note down this Invoke URL.

25.	Next, you need to create a Usage Plan. Select the setting from the menu on the left

    ![Alt text](./images/aws-45.png)

26.	Enter a Name and untick Enable throttling and Enable quota.

    ![Alt text](./images/aws-46.png)

27.	Associate the Usage Plan with the Stage you just deployed
    
    ![Alt text](./images/aws-47.png)

28.	Create an API Key to be able to authenticate and call the PUT method

    You can create the API Key directly from this screen and associate it with the Usage Plan.

    ![Alt text](./images/aws-48.png)
    ![Alt text](./images/aws-49.png)

29.	Once the API Key has been created and associated with the Usage Plan, click Done
    
    ![Alt text](./images/aws-50.png)

30.	Retrieve the API Key by selecting API Keys and the name of the key and **Show** 

    ![Alt text](./images/aws-51.png)
    ![Alt text](./images/aws-52.png)

    Keep this key handy to be utilized within SAP Build Apps. 

</details>

You have now successfully created your API to store and retrieve files from Amazon S3. 

## Section 4: Consume Amazon S3 API in SAP Build Apps application

This section describes how to consume the Amazon S3 API in the SAP Build Apps application.
<details>

### Step 1: Create required Page Variables in the SAP Build Apps application

1. Log in to SAP Build Apps and open the **Business partner-onboarding** application that you created in the previous exercise 2.2

    ![Alt text](./images/build-01.png)

2. Switch to the **VARIABLES** tab.

    ![Alt text](./images/build-02.png)

3. Choose **PAGE VARIABLES** and then click on **ADD PAGE VARIABLE**

    ![Alt text](./images/build-03.png)

4. Enter the **Variable name** as **fileUpload**, select the **Variable value type** as **List** and then select **List item type** as **Object**

    ![Alt text](./images/build-04.png)

5. In the **Add new property** field, enter the property name as **createdAt** and then click the **+** button.

    ![Alt text](./images/build-05.png)

6. Expand the **fileUpload** variable, click the **createAt** property and select **Variable value type** as **Date/time text(ISO 8601)**

    ![Alt text](./images/build-06.png)

7. Add 5 more properties to this **fileUpload** variable by repeating steps 5 and 6 above.

    Property Name | type | 
    --- | --- |
    mimeType | Text |
    modifiedAt | Date/time text(ISO 8601) |
    name | Text |
    path | Text |
    size | Number |

    The variable **fileUpload** should look like this.

    ![Alt text](./images/build-07.png)

8. Add another page variable with a name as **s3apikey** and **Variable value type** as **Text** and set the initial value as the value that you have noted from **Section 3: Step 30**.
    
    ![Alt text](./images/build-08.png)

9. Add another page variable with the name as **uploadUrl** and **Variable value type** as **Text** and Initial value as the value that you have noted as Invoke URL from **Section 3: Step 23** and append it with the bucket name that you have created.

    For example, if the invoke URL is **https://ajdgjafdaf.execute-api.eu-west-1.amazonaws.com/v1** and the bucket name **test-bucket01**, then enter the Initial value
    as **https://ajdgjafdaf.execute-api.eu-west-1.amazonaws.com/v1/test-bucket01/**


    ![Alt text](./images/build-09.png)

10. Switch back to the **VIEW** tab.

    ![Alt text](./images/build-10.png)

### Step 2: Add components to the SAP Build Apps application

1. Drag and drop the **Button** name it as **Select Document** and change the **STYLE** to **Secondary Button**.

    ![Alt text](./images/buildapp-01.png)

2. Click on the **Select Document** button and then Click on **Add logic to BUTTON 2**

    ![Alt text](./images/buildapp-02.png)

3. Click on the **MARKETPLACE** in the LOGIC CANVAS

    ![Alt text](./images/buildapp-03.png)

4. Search for "pick files" and then choose **Pick files** from the search results

    ![Alt text](./images/buildapp-04.png)

5. Install this component by clicking the **Install** button.

    ![Alt text](./images/buildapp-05.png)

6. Install another component by name **Upload files** by following steps 3,4 and 5 above. Select the one with the description "Upload file(s) to the given URL(s)".

    ![Alt text](./images/buildapp-06.png)

7. Drag and drop the **Pick files** component to the LOGIC CANVAS and then connect it to the Component tap.

    ![Alt text](./images/buildapp-07.png)

8. Drag and drop the **Set page variable** component to the LOGIC CANVAS and then connect it to the success output of the **Pick files** component.

    ![Alt text](./images/buildapp-08.png)

9. Click on the button under the **Assigned Value** field.

    ![Alt text](./images/buildapp-09.png)

10. Click on the button **Output value of another node** in the popup.

    ![Alt text](./images/buildapp-10.png)

11. Choose **Pick files** under **Select logic node**

    ![Alt text](./images/buildapp-11.png)

12. Choose **Files** under **Select node output**

    ![Alt text](./images/buildapp-12.png)

13. Choose **Save** to save the binding.

    ![Alt text](./images/buildapp-13.png)

14. Click on the **Create** button in the **Business Partner Onboarding** form and then drag and drop the **Upload files** component to the **LOGIC CANVAS**

    ![Alt text](./images/buildapp-14.png)

15. Connect **Create record** success output to **Upload files** input and connect **Upload files** success output to success alert and connect **Upload files** failure output to failure alert respectively.

    ![Alt text](./images/buildapp-15.png)

16. Click on **Upload files** and then in the **PROPERTIES** tab on the right-hand side, click the binding button as shown below.

    ![Alt text](./images/buildapp-16.png)

17. Enter the formula as **[SET_KEY(pageVars.fileUpload[0], "uploadUrl", pageVars.uploadUrl+ data.A_BusinessPartner1.BusinessPartner+".pdf")]** and then choose to **Save** the binding.

    ![Alt text](./images/buildapp-17.png)

18. Click on the **Headers** under the **OPTIONAL INPUTS**

    ![Alt text](./images/buildapp-18.png)

19. In the pop-up, enter the Formula as **{"Content-Type":"application/pdf","x-api-key":pageVars.s3apikey}** and then choose **Save**.

    ![Alt text](./images/buildapp-19.png)

20. Save the application by clicking on the **Save** button.

    ![Alt text](./images/buildapp-19.png)

</details>

## Section 5: Testing the application

<details>

1. Choose the tab **Launch** at the top of App Builder.

    ![Alt text](./images/bptest-01.png)

2. Choose the **Open Preview portal** button to open the application.

    ![Alt text](./images/bptest-02.png)

3. It opens a new browser tab. Choose **Open Web Preview** in this new tab.

    ![Alt text](./images/bptest-03.png)

4. Click on the **Open** button in the **Business Partner-onboarding** app tile.

    ![Alt text](./images/bptest-04.png)

5. It opens the application preview.

    ![Alt text](./images/bptest-05.png)

6. Enter the **Business Partner ID**, **First Name** and **Last Name**, click on **Select Document**, choose the supporting document (pdf) and then click on **Create**.

    ![Alt text](./images/bptest-06.png)

7. If the business partner is created, it displays the **Business Partner created successfully** message in the popup.

    ![Alt text](./images/bptest-07.png)

You can also log in to AWS console, navigate to the Amazon S3 bucket and verify that the pdf file with the name as business partner ID is created.

</details>

You have successfully tested the application. In the next unit, you will enhance this application with a simple approval process in the SAP Build Process Automation scenario.
[Build a simple approval scenario in the SAP Build Process Automation](../Unit%202.4/README.md)














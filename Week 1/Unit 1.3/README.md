# Unit 1.3 Amazon Web Services basics and setup

This exercise is part of the openSAP course [Build Resilient Applications on SAP BTP with Amazon Web Services](https://open.sap.com/courses/aws1), Week 1 Unit 3 - Amazon Web Services basics and setup.

The objective of the exercise is to create an AWS Free tier account that you can further use throughout this course and beyond. 

## Step 1 - Create a new AWS Account

1.	Access the [AWS Free Tier page](https://aws.amazon.com/free/).

    ![Login](./images/offers.png)

2. Select **Create a Free Account** and then choose **Create a new AWS account**.

     ![Login](./images/createaccount.png)


     ![Login](./images/createaccount1.png)

3. In the **Root user email address** field, enter your email address, and in the **AWS Account name** enter an account name, and then choose **Verify email address**. 

     ![Login](./images/signup.png)


4. An AWS verification email will be sent to this address with a verification code. Enter the code you receive, and then choose Verify. The code might take a few minutes to arrive. 

     ![Login](./images/verifycode.png)

    Enter the code and choose Verify.

     ![Login](./images/updateverifycode.png)

5. Create your password. Update the fields **Root user password** and **Confirm root user password**, and then choose Continue.

     ![Login](./images/step1.png)

6. Enter information as requested in Step 2 of Signup and complete the process. Select Personal or Business (        Note: Personal accounts and business accounts have the same features and functions). Enter all the mandatory details and choose to Continue.
    
    ![Login](./images/step2.png)

    You receive an email to confirm that your account is created. You can sign in to your new account using the email address and password that you registered with. However, you can't use AWS services until you finish activating your account.

7. Add Payment Method

    On the Billing information page, enter the information about your payment method, and then choose Verify and Add.

    Note: If you are signing up in India for an Amazon Web Services Private Limited (AWS India) account, then you must provide your CVV as part of the verification process. You might also have to enter a one-time password, depending on your bank. AWS India charges your payment method two Indian Rupees (INR), as part of the verification process. AWS India refunds the two INR after the verification is complete.
    If you want to use a different billing address for your AWS billing information, choose Use a new address. Then, choose Verify and Continue.

    Important: You can't proceed with the sign-up process until you add a valid payment method.

    ![Login](./images/step3.png)

8. In the Confirm your identity page, select a contact method to receive a verification code. Select your phone number country or region code from the list and enter a mobile phone number where you can be reached in the next few minutes. If presented with a CAPTCHA, enter the displayed code, and then submit.

    ![Login](./images/step4.png)

    Enter the PIN you would have received and choose to **Continue**.

    ![Login](./images/step4a.png)

    Choose the purpose of account registration and choose to Continue.

    ![Login](./images/step4b.png)

9. On the Select a Support Plan page, choose one of the available Support plans. For a description of the available Support plans and their benefits, see Compare AWS Support plans.

    ![Login](./images/step5.png)


    Wait for account activation.

    After you choose a Support plan, a confirmation page indicates that your account is being activated. Accounts are usually activated within a few minutes, but the process might take up to 24 hours.
    You can sign in to your AWS account during this time. The AWS home page might display a Complete Sign-Up button during this time, even if you've completed all the steps in the sign-up process.
    When your account is fully activated, you receive a confirmation email. Check your email and spam folder for the confirmation email. After you receive this email, you have full access to all AWS services. You can now log in to your AWS Account. Note: Your AWS console may differ compared to the below screenshot.

    ![Login](./images/accountcreated.png)


    ![Login](./images/console.png)

10. Choose **Sign In** to go to the AWS Management Console.

    ![Login](./images/consolehome.png)


## Step 2 - Setup email alerts for usage and billing

1.  Set up alert preferences for billing.

    ![Login](./images/billingpref.png)

2. Click on Edit to select the preferences

    ![Login](./images/billingprefupdate.png)


## Step 3 - Setup a cost budget

1.  Select Budgets to create a Budget.

    ![Login](./images/setup_budget.png)

2.  Choose the Budget type as shown below.

    ![Login](./images/budget_simple.png)

    Select the template, enter a budget name and email recipients and then choose to Create.

    ![Login](./images/budgettype.png)

    ![Login](./images/viewbudget.png)

Congratulations! You are ready with the setup for SAP BTP and AWS Development. 
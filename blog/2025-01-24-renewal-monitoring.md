---
title: Certificate Renewal Monitoring Options
description: Tracking large numbers of certificates can get complicated. Learn about the various options available.
slug: renewal-monitoring
authors: webprofusion-chrisc
tags: [certify, news, management-hub, dashboard]

---

Managing SSL/TLS certificates can be a daunting task, especially when dealing with a large number of certificates across multiple domains and servers. Ensuring that certificates are successfully renewed on time is crucial to maintaining the security and trustworthiness of your websites and services. 

Recently Let's Encrypt in particular have announced they will no longer send expiry notification emails, leaving end-users wondering how best to keep track.

In this article, we will explore various options for certificate renewal monitoring tools, including RedSift and Certify Dashboard, and how they compare.

<!-- truncate -->

## RedSift

### Overview
RedSift is a cybersecurity platform that offers a range of tools for managing and monitoring digital certificates. Their certificate monitoring solution helps organizations keep track of their SSL/TLS certificates and ensures timely renewals.

### Key Features
- **Automated Monitoring**: Continuously monitors your certificates and alerts you to upcoming expirations.
- **Detailed Reporting**: Provides comprehensive reports on the status of your certificates, including expiration dates and renewal history.
- **Integration**: Integrates with various platforms and services to provide a seamless monitoring experience.
- **Security Alerts**: Notifies you of any security issues related to your certificates, such as weak encryption or misconfigurations.

### Pros
- Comprehensive monitoring and reporting features.
- Integration with multiple platforms.
- Security alerts for potential issues.

### Cons
- May require a learning curve to fully utilize all features.
- Pricing may be a consideration for smaller organizations.
- Only tracks certificate issuance, not ACME client renewal attempts.

## Certify Dashboard

### Overview
Certify Dashboard is a hosted service designed to simplify and streamline the monitoring of SSL/TLS certificate renewals. It integrates seamlessly with Certify Certificate Manager and other ACME clients, providing a centralized platform for managing your certificates. 

Certify Dashboard is unique in that it is not a Certificate Transparency Log monitor, it doesn't just track certificate issuance, its shows attempted renewals and potentially their associated failures.

### Key Features
- **Centralized Management**: View and manage all your certificates from a single interface.
- **Automated Renewals**: Automatically tracks and reports on certificate renewals, ensuring they are always up-to-date.
- **Detailed Reporting**: Get detailed reports on the status of your certificates, including upcoming expirations and renewal history.
- **Integration with ACME Clients**: Works with popular ACME clients like Certbot and acme.sh, making it easy to incorporate into your existing workflow.
- **Secure and Reliable**: Uses industry-standard encryption and security practices to protect your certificates and data.

### Pros
- User-friendly interface for managing certificates.
- Seamless integration with Certify Certificate Manager and other ACME clients.
- Automated tracking and reporting of certificate renewal attempts.

### Cons
- Limited to environments that support ACME clients.
- Some advanced features may require a paid license.

## Comparison

### Ease of Use
Certify Dashboard offers a user-friendly interface that simplifies the process of managing and monitoring certificates. RedSift, while comprehensive, may require a learning curve to fully utilize all its features.

### Integration
Both RedSift and Certify Dashboard offer integration with various platforms and services. However, Certify Dashboard's seamless integration with Certify Certificate Manager and other ACME clients makes it a more straightforward choice for users already utilizing these tools.

### Reporting and Alerts
Both tools provide detailed reporting and alerts for upcoming certificate expirations. RedSift also offers security alerts for potential issues, which can be a valuable feature for organizations concerned about certificate-related security risks.

### Pricing
Pricing can be a consideration for smaller organizations. Certify Dashboard will offer a free tier for managing up to 250 certificates, making it an attractive option for smaller setups. RedSift's pricing may be higher, but it offers a broader range of cybersecurity tools beyond certificate monitoring.

## Conclusion

Both RedSift and Certify Dashboard provide robust solutions for monitoring SSL/TLS certificate renewals. The choice between them will depend on your specific needs and existing infrastructure. Certify Dashboard is an excellent choice for users looking for a straightforward, integrated solution with Certify Certificate Manager and other ACME clients. RedSift, on the other hand, offers a more comprehensive cybersecurity platform with additional features and integrations.

We encourage you to explore both options and choose the one that best fits your requirements. Ensuring timely certificate renewals is crucial for maintaining the security and trustworthiness of your websites and services.
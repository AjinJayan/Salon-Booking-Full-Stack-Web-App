# Salon Booking Platform

A full-stack salon booking application that connects customers with salon services, featuring a modern **React**-based frontend and a microservices-based backend architecture.

## Demo Video

###Normal User Experience 
https://github.com/user-attachments/assets/76c1b495-6cb1-40b0-b383-408e85c041b9

###Salon Owner Experience
https://github.com/user-attachments/assets/e731cfb1-0316-4d12-9197-91cb6824473f

###Registering New Salon(Become a partner)
https://github.com/user-attachments/assets/25494485-9496-4e90-92d5-afe3ac54d32e

## 🌟 Features

### Frontend

- Modern, responsive UI built with **React** and **Vite**
- Intuitive booking interface
- Service browsing and filtering
- **User authentication** and profile management
- Real-time booking status updates using **WebSockets**
- **Review and rating** system
- **Payment integration** with **Razorpay**

### Backend (Microservices Architecture)

- **API Gateway**: Centralized request routing and load balancing
- **Service Discovery**: **Eureka Server** for service registration and discovery
- **Message Broker**: **RabbitMQ** for asynchronous communication between services
- **Core Services**:
  - **User Service**: Authentication and user management
  - **Salon Service**: Salon and service provider management
  - **Booking Service**: Appointment scheduling and management
  - **Payment Service**: Secure payment processing with **Razorpay** integration
  - **Review Service**: Customer reviews and ratings
  - **Notification Service**: Email and SMS notifications
  - **Category Service**: Service categorization and management

## 🚀 Tech Stack

### Frontend

- **Framework**: **React**
- **Build Tool**: **Vite**
- **State Management**: **Redux**
- **Styling**: **Tailwind CSS** and **MUI**
- **Routing**: **React Router**
- **HTTP Client**: **Axios**, **fetch**
- **WebSocket Client**: **SockJS**, **STOMP**
- **Form Management**: **Formik**
- **Toast Notifications**: **React Toastify**
- **Image Management**: **Cloudinary**

### Backend

- **Core**: **Spring Boot**
- **Service Discovery**: **Netflix Eureka**
- **API Gateway**: **Spring Cloud Gateway**
- **Database**: **MySQL**
- **Authentication**: **JWT** (JSON Web Tokens) with **Keycloak**
- **Message Broker**: **RabbitMQ** for async communication
- **Containerization**: **Docker**
- **Orchestration**: **Docker Compose**
- **Payment Gateway**: **Razorpay** integration

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- Java 17 or higher
- Maven
- Docker and Docker Compose
- MySQL

## 🚀 Getting Started

### Backend Setup

1. **Start the Eureka Server**

   ```bash
   cd eureka_server
   mvn spring-boot:run
   ```

2. **Start Other Services**
   In separate terminals, start each microservice:

   ```bash
   # API Gateway
   cd gateway_server
   mvn spring-boot:run

   # User Service
   cd user_service
   mvn spring-boot:run

   # Other services...
   ```

### Frontend Setup

1. **Install Dependencies**

   ```bash
   cd frontend/salon-booking
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Docker Setup (Alternative)

```bash
docker-compose -f docker-compose/default/docker-compose.yml up -d
```

## 📂 Project Structure

```
.
├── backend/
│   ├── eureka_server/       # Service discovery server
│   ├── gateway_server/      # API Gateway
│   ├── user_service/        # User management
│   ├── salon_service/       # Salon management
│   ├── booking_service/     # Booking management
│   ├── payment_service/     # Payment processing
│   ├── review/              # Review system
│   ├── notifications/       # Notification service
│   └── category_service/    # Service categories
├── frontend/
│   └── salon-booking/       # React frontend application
│       ├── public/          # Static files
│       └── src/             # Source code
└── docker-compose/          # Docker configuration
```

## 🔒 Environment Variables

Create `.env` files in each service directory with the required configurations. Refer to `.env.example` in each service for reference.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Vite](https://vitejs.dev/)
- And all other open-source libraries used in this project

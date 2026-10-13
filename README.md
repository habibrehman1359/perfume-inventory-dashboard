# Perfume Inventory Sync Dashboard

A full-stack catalog and inventory synchronization system built to monitor stock levels and product pricing in real time.

## Overview

This project connects a React-based store management frontend with an Express and MySQL backend to keep perfume inventory aligned across sales channels.

## Tech Stack

- Frontend: React, Vite, Bootstrap
- Backend: Node.js, Express.js
- Database: MySQL
- Version Control: Git & GitHub

## System Architecture

- backend/ — REST API services, connection pooling, and inventory endpoints.
- fullstack-dashboard/ — Admin interface for stock management.

## API Endpoints (v1)

| Method | Endpoint     | Description                                      | Status |
| ------ | ------------ | ------------------------------------------------ | ------ |
| GET    | /api/v1/test | Verifies DB connection and returns product stock | Active |

## Database Setup

CREATE DATABASE IF NOT EXISTS testing;
USE testing;

CREATE TABLE IF NOT EXISTS products (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
price DECIMAL(10, 2) NOT NULL,
stock INT NOT NULL DEFAULT 0,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

## Local Development Guide

### Run Backend

1. cd backend
2. npm install
3. npm run dev

### Run Frontend

1. cd fullstack-dashboard
2. npm install
3. npm run dev

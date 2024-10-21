terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.72.1"
    }
  }
}


provider "aws" {
  region = var.region
}

resource "aws_security_group" "canvas_collective_security" {
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["86.175.168.210/32", "212.69.43.233/32"]
  }

  ingress {
    from_port = 3000
    to_port = 3000
    protocol = "tcp"
    cidr_blocks = ["212.69.43.233/32"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
   egress {
    from_port   = 53
    to_port     = 53
    protocol    = "udp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = var.aws_security_group_name
  }
}
resource "aws_instance" "canvas_collective" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = "canvas_collective"
  tags = {
    Name = var.aws_instance
  }
}


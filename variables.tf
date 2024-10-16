variable "region" {
  default = "eu-west-2"
}

variable "ami_id" {
  default = "ami-0acc77abdfc7ed5a6"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "aws_security_group_name" {
  default = "canvas_collective_security"
}

variable "aws_instance" {
    default = "canvas_collective"
}
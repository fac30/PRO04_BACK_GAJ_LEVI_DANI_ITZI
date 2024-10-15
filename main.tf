provider "aws" {
    region = var.region
  }
    
resource "aws_instance" "canvas_collective" {
    ami = var.ami_id
    instance_type = var.instance_type
    tags = {
      Name = "canvas_collective"
    }
    }
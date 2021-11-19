resource "aws_subnet" "subnet" {
  vpc_id            = var.vpc_id
  cidr_block        = var.cidrs[count.index]
  availability_zone = var.azs[count.index]
  count             = length(var.cidrs)

  tags = {
    Name = "${var.name}.${element(var.azs, count.index)}"
  }
}

resource "aws_route_table" "subnet" {
  vpc_id = var.vpc_id
  count  = length(var.cidrs)

  tags = {
    Name = "${var.name}.${element(var.azs, count.index)}"
  }
}

resource "aws_route_table_association" "subnet" {
  subnet_id      = aws_subnet.subnet.*.id[count.index]
  route_table_id = aws_route_table.subnet.*.id[count.index]
  count          = length(var.cidrs)
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat.*.id[count.index]
  subnet_id     = flatten(var.subnet_ids)[count.index]
  count         = var.subnet_count
}

resource "aws_eip" "nat" {
  vpc   = true
  count = var.subnet_count
}

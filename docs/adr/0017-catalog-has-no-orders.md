# Catalog has no orders

Retired from the current Portfolio scope by [ADR 0021](./0021-observa-is-anchor.md).

Catalog is products, variants, and on-hand stock. It does not take orders, does not check out, and does not know Order Pipeline. Stock changes only through receive and adjust. That is the seam that stops Catalog from becoming a second inventory service for pedidos. Order Pipeline keeps its own stock story.

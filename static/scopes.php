/**
   * @param Builder $query
   * @param <model-studly> $order
   *
   * @return void
   */
  public function scopeBy<model-studly>(Builder $query, <model-studly> $<model-camel>): void
  {
    $query->where(<model-upper>, $<model-camel>->id);
  }

  /**
   * @param Builder $query
   * @param int $id
   *
   * @return void
   */
  public function scopeBy<model-studly>Id(Builder $query, int $id): void
  {
    $query->where(<model-upper>, $id);
  }

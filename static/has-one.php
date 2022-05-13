<?php

namespace App\Traits;

use App\ServiceOrder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property-read void $byOrder
 * @property-read void $byOrderId
 */
trait HasOrder
{
  /**
   * @return BelongsTo
   */
  public function order(): BelongsTo
  {
    return $this->belongsTo(ServiceOrder::class, self::ORDER_FOREIGN_KEY);
  }

  /**
   * @return BelongsTo
   */
  public function service_order(): BelongsTo
  {
    return $this->belongsTo(ServiceOrder::class, self::ORDER_FOREIGN_KEY);
  }

  /**
   * @return BelongsTo
   */
  public function service_orders(): BelongsTo
  {
    return $this->belongsTo(ServiceOrder::class, self::ORDER_FOREIGN_KEY);
  }

  /**
   * @param Builder $query
   * @param ServiceOrder $order
   *
   * @return void
   */
  public function scopeByOrder(Builder $query, ServiceOrder $order): void
  {
    $query->where(self::ORDER_FOREIGN_KEY, $order->id);
  }

  /**
   * @param Builder $query
   * @param int $id
   *
   * @return void
   */
  public function scopeByOrderId(Builder $query, int $id): void
  {
    $query->where(self::ORDER_FOREIGN_KEY, $id);
  }
}

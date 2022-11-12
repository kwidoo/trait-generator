<?php

namespace <model-folder>Traits;

use <model-folder><model-studly>;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait HasOne<traitName>
{
  /**
   * @return HasOne
   */
  public function <model-snake>(): HasOne
  {
    return $this->hasOne(<model-studly>::class, <foreign-key2>, <foreign-key1>);
  }
}

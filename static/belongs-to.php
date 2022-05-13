<?php

namespace App\Traits;

use App\<model-folder><model-studly>;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait <traitName>
{
  /**
   * @return BelongsTo
   */
  public function <model-snake>(): BelongsTo
  {
    return $this->belongsTo(<model-studly>::class, <model-upper>);
  }

  <scopes>
}

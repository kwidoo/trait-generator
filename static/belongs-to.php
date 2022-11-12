<?php

namespace <model-folder>Traits;

use <model-folder><model-studly>;
use <model-folder><model-reverse-studly>;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait BelongsTo<traitName>
{
  /**
   * @return BelongsTo
   */
  public function <model-snake>(): BelongsTo
  {
    return $this->belongsTo(<model-studly>::class, <foreign-key1>, <foreign-key2>);
  }<scopes>
}

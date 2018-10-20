<?php

namespace App\Repositories;

use App\Conversion;

class ConversionRepository extends Repository
{
    /**
     * Create new instance of conversion repository.
     *
     * @param Conversion $conversion Conversion repository.
     */
    public function __construct(Conversion $conversion)
    {
        parent::__construct($conversion);
        $this->conversion = $conversion;
    }

    public function paginateWithFilters(
        $request = null,
        $length = 10,
        $orderBy = 'desc',
        $removePage = true
    ) {
        return $this->conversion->filter($request)
            ->orderBy('created_at', $orderBy)
            ->paginate($length)
            ->withPath(
                $this->conversion->createPaginationUrl($request, $removePage)
            );
    }
}

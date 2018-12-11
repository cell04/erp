<?php

namespace App\Repositories;

use App\PurchaseOrder;
use App\Quotation;
use App\Stock;
use App\StockRequest;
use App\StockTransfer;
use Carbon\Carbon;

class DashboardRepository
{
    protected $today;
    protected $quotation;
    protected $stockRequest;
    protected $stockTransfer;
    protected $purchaseOrder;
    protected $stock;
    protected $limit = 10;
    protected $orderBy = 'desc';

    public function __construct(
        Quotation $quotation, 
        StockRequest $stockRequest, 
        StockTransfer $stockTransfer, 
        PurchaseOrder $purchaseOrder, 
        Stock $stock
    )
    {
        $this->today = Carbon::today();
        $this->quotation = $quotation;
        $this->stockRequest = $stockRequest;
        $this->stockTransfer = $stockTransfer;
        $this->purchaseOrder = $purchaseOrder;
        $this->stock = $stock;
    }

    // All functions here
    public function testPayload()
    {
        return
            [
                ['date' => '01/02/2018', 'data' => 10],
                ['date' => '01/02/2018', 'data' => 15],
                ['date' => '01/03/2018', 'data' => 15],
                ['date' => '01/04/2018', 'data' => 20],
                ['date' => '01/05/2018', 'data' => 25],
                ['date' => '01/06/2018', 'data' => 17],
                ['date' => '01/07/2018', 'data' => 5]
            ];
    }

    public function dashboardPayload()
    {
        return array(
            'pending_quotations' => $this->pendingQuotations(),
            'pending_stock_requests' => $this->pendingStockRequests(),
            'pending_stock_transfers' => $this->pendingStockTransfers(),
            'pending_purchase_orders' => $this->pendingPurchaseOrders(),
            'today_purchase_orders' => $this->todayPurchaseOrders(),
            'today_quotations' => $this->todayQuotations(),
            'shelf_days_per_item' => $this->shelfDaysPerItem()
        );
    }

    public function pendingQuotations()
    {
        return $this->quotation->where('status', 0)
        ->orderBy('created_at', $this->orderBy)
        ->get();
    }

    public function pendingStockRequests()
    {
        return $this->stockRequest->where('status', 0)
        ->orderBy('created_at', $this->orderBy)
        ->get();
    }

    public function pendingStockTransfers()
    {
        return $this->stockTransfer->where('status', 0)
        ->orderBy('created_at', $this->orderBy)
        ->get();
    }

    public function pendingPurchaseOrders()
    {
        return $this->purchaseOrder->where('status', 0)
        ->orderBy('created_at', $this->orderBy)
        ->get();
    }

    public function todayPurchaseOrders()
    {
        return $this->purchaseOrder->whereDate('created_at', $this->today)
        ->orderBy('created_at', $this->orderBy)
        ->get();
    }

    public function todayQuotations()
    {
        return $this->quotation->whereDate('created_at', $this->today)
        ->orderBy('created_at', $this->orderBy)
        ->get();
    }

    public function shelfDaysPerItem()
    {
        return $this->stock->orderBy('created_at')
        ->limit($this->limit)
        ->get();
    }
}

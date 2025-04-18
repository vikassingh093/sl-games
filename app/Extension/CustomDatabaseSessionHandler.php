<?php

namespace VanguardLTE\Extension;

use Illuminate\Database\QueryException;
use Illuminate\Session\DatabaseSessionHandler;
use Illuminate\Support\Arr;
use VanguardLTE\Helpers\UserSystemInfoHelper;


class CustomDatabaseSessionHandler extends DatabaseSessionHandler {

    protected function performInsert($sessionId, $payload)
    {
        try {

            $data = [
                'user_id' => \Auth::check() ? auth()->user()->id : null,
            ];

            return $this->getQuery()->insert(Arr::set($payload, 'id', $sessionId) + $data);
        } catch (QueryException $e) {
            $this->performUpdate($sessionId, $payload);
        }
    }


}

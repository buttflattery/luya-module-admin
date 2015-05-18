<script>
strapCallbackUrl = '<?= $strapCallbackUrl;?>';
ngrestConfigHash = '<?= $config->getNgRestConfigHash(); ?>';
zaa.bootstrap.register('<?=$config->getNgRestConfigHash(); ?>', function($scope, $controller) {
    /* extend class */
    $.extend(this, $controller('CrudController', { $scope : $scope }));
    /* local controller config */
    $scope.config.apiListQueryString = '<?= $crud->apiQueryString('list'); ?>';
    $scope.config.apiUpdateQueryString = '<?= $crud->apiQueryString('update'); ?>';
    $scope.config.apiEndpoint = '<?=$config->getRestUrl();?>';
    $scope.config.list = <?=json_encode($crud->getFields('list'));?>;
    $scope.config.create = <?=json_encode($crud->getFields('create'));?>;
    $scope.config.update = <?=json_encode($crud->getFields('update'));?>;
    $scope.config.ngrestConfigHash = '<?= $config->getNgRestConfigHash(); ?>';
    $scope.config.strapCallbackUrl = '<?= $strapCallbackUrl;?>';
});
</script>

<div ng-controller="<?=$config->getNgRestConfigHash(); ?>" ng-init="init()">
<a class="btn-floating btn-large waves-effect waves-light right red" style="margin:20px;" ng-click="openCreate()"><i class="mdi-content-add"></i></a>
<!-- LIST -->
<div class="card-panel">
    <table class="striped responsive-table">
    <thead>
        <tr>
            <?php foreach ($crud->list as $item): ?>
                <th><?= $item['alias']; ?></th>
            <?php endforeach; ?>
            <?php if (count($crud->getButtons()) > 0): ?>
                <th style="text-align:right;">Aktionen</th>
            <?php endif; ?>
      </tr>
    </thead>
    <tbody>
        <tr ng-repeat="item in data.list">
            <?php foreach ($crud->list as $item): ?>
                <? foreach($crud->createElements($item, $crud::TYPE_LIST) as $element): ?>
                    <td><?= $element['html']; ?></td>
                <? endforeach; ?>
            <?php endforeach; ?>
            <?php if (count($crud->getButtons()) > 0): ?>
            <td style="text-align:right;">
                <?php foreach ($crud->getButtons() as $item): ?>
                <a class="waves-effect waves-light btn" ng-click="<?= $item['ngClick']; ?>"><i class="<?=$item['icon']; ?> left"></i><?=$item['label']; ?></a>
                <?php endforeach; ?>
            </td>
            <?php endif; ?>
        </tr>
    </tbody>
    </table>
</div>
<!-- CREATE MODAL -->
<div id="createModal" class="modal">
    <form role="form" ng-submit="submitCreate()">
        <div class="modal-content">
            <?php foreach ($crud->create as $k => $item): ?>
            <div class="row">
                <? foreach($crud->createElements($item, $crud::TYPE_CREATE) as $element): ?>
                    <?= $element['html']; ?>
                <? endforeach; ?>
            </div>
            <? endforeach; ?>
            <!-- 
                <div style="background-color:red; padding:20px;" ng-show="createErrors.length">
                    <ul>
                        <li ng-repeat="error in createErrors" style="padding:10px;"><strong>{{error.field}}</strong>: {{error.message}}</li>
                    </ul>
                </div>
             -->
        </div>
        <div class="modal-footer">
            <button class="btn waves-effect waves-light" type="submit" ng-disabled="createForm.$invalid">
                <i class="mdi-content-send"></i> Hinzufügen
            </button>
            <button class="btn waves-effect waves-light" type="button" ng-click="closeCreate()">
                <i class="mdi-navigation-cancel"></i> Cancel
            </button>
        </div>
    </form>
</div>
<!-- UPDATE MODAL -->
<div id="updateModal" class="modal">
    <form role="form" ng-submit="submitUpdate()">
        <div class="modal-content">
            <?php foreach ($crud->update as $k => $item): ?>
            <div class="row">
                <? foreach($crud->createElements($item, $crud::TYPE_UPDATE) as $element): ?>
                    <?= $element['html']; ?>
                <? endforeach; ?>
            </div>
            <? endforeach; ?>
            <!-- 
                <div style="background-color:red; padding:20px;" ng-show="createErrors.length">
                    <ul>
                        <li ng-repeat="error in updateErrors" style="padding:10px;"><strong>{{error.field}}</strong>: {{error.message}}</li>
                    </ul>
                </div>
             -->
        </div>
        <div class="modal-footer">
            <button class="btn waves-effect waves-light" type="submit" ng-disabled="createForm.$invalid">
                <i class="mdi-content-send"></i> Speichern
            </button>
            <button class="btn waves-effect waves-light" type="button" ng-click="closeUpdate()">
                <i class="mdi-navigation-cancel"></i> Cancel
            </button>
        </div>
    </form>
</div>
          
</div>